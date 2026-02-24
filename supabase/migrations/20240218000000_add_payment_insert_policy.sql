-- Allow authenticated users to insert their own payment records
CREATE POLICY "Users can insert their own payments" ON public.payment_records
    FOR INSERT WITH CHECK (auth.uid() = user_id);
