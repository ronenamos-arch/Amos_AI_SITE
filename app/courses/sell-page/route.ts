import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(
        process.cwd(),
        "course-content",
        "ai-master-course",
        "sell-page.html"
    );

    let html = fs.readFileSync(filePath, "utf-8");

    // Fix asset paths so scripts and images load correctly
    html = html.replace(
        '<script src="./support.js">',
        '<script src="/course-assets/ai-master-course/support.js">'
    );
    html = html.replace(/src="Images\/([^"]+)"/g, 'src="/course-assets/ai-master-course/images/$1"');

    // Inject CSS guard: hide the modal overlay and the entire x-dc wrapper
    // initially so they are never visible if support.js fails to initialize.
    // support.js removes the x-dc rule itself once it finishes rendering;
    // the modal rule targets only the fixed-position overlay div directly.
    const cssGuard = `<style>
x-dc{display:none!important}
sc-if[value*="modalOpen"]>div{display:none!important}
</style>`;
    html = html.replace("</head>", cssGuard + "</head>");

    // Ensure the modal overlay can always be closed via plain JS click,
    // independent of support.js event wiring.
    const jsGuard = `<script>
(function(){
  document.addEventListener('click',function(e){
    var overlay=e.target.closest&&e.target.closest('sc-if[value*="modalOpen"]>div');
    if(overlay&&e.target===overlay){overlay.style.display='none';}
  },true);
})();
</script>`;
    html = html.replace("</body>", jsGuard + "</body>");

    return new NextResponse(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
