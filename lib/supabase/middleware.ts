import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // refreshing the auth token
    const { data: { user } } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    if (path.startsWith('/admin')) {
        if (!user || user.email !== "ronenamos@gmail.com") {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/';
            redirectUrl.search = '';
            return NextResponse.redirect(redirectUrl);
        }
    }

    // The recorded webinars live as static files under public/resources/webiners.
    // Static files bypass every page-level access check, so subscribers-only
    // enforcement has to happen here, before the file is served.
    if (path.startsWith('/resources/webiners')) {
        let hasAccess = false;
        if (user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('subscription_status, subscription_end_date')
                .eq('id', user.id)
                .single();
            if (profile) {
                const endDate = profile.subscription_end_date
                    ? new Date(profile.subscription_end_date)
                    : null;
                hasAccess =
                    profile.subscription_status === 'monthly' ||
                    profile.subscription_status === 'lifetime' ||
                    (profile.subscription_status === 'cancelled' &&
                        endDate !== null &&
                        endDate > new Date());
            }
        }
        if (!hasAccess) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/lessons';
            redirectUrl.search = '';
            return NextResponse.redirect(redirectUrl);
        }
    }

    return supabaseResponse;
}
