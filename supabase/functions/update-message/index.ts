import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    if (req.method === 'POST') {
      // Handle POST request from iOS Shortcuts
      const { text } = await req.json()
      
      if (!text) {
        return new Response(
          JSON.stringify({ error: 'Text is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Update or insert message
      const { data, error } = await supabaseClient
        .from('messages')
        .upsert({ 
          id: '00000000-0000-0000-0000-000000000001', // Fixed ID for single message
          text: text,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) {
        console.error('Error updating message:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to update message' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      return new Response(
        JSON.stringify({ message: 'Message updated successfully', data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (req.method === 'GET') {
      // Get current message
      const { data, error } = await supabaseClient
        .from('messages')
        .select('text, updated_at')
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching message:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch message' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const text = data?.text || 'Thinking of you'
      
      return new Response(
        JSON.stringify({ text, updated_at: data?.updated_at }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})