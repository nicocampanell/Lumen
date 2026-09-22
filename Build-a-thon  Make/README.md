
  # Build-a-thon  Make

  This is a code bundle for Build-a-thon  Make. The original project is available at https://www.figma.com/design/qpoMoGzqqszr6Hqx0Ual7B/Build-a-thon--Make.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Optional local Garmin connection

  Lumin can import Garmin summaries through the local `Taxuspt/garmin_mcp`
  server. Authentication is terminal-only; never paste credentials, MFA codes,
  or tokens into Lumin. The upstream CLI stores tokens in `~/.garminconnect`.

  In a private terminal, run:

  ```sh
  uvx --python 3.12 --from git+https://github.com/Taxuspt/garmin_mcp garmin-mcp-auth
  GARMIN_MCP_TRANSPORT=streamable-http GARMIN_ENABLED_TOOLS=get_heart_rates_summary,get_stress_summary,get_sleep_summary_range,get_hrv_trend,get_body_battery uvx --python 3.12 --from git+https://github.com/Taxuspt/garmin_mcp garmin-mcp
  pnpm dev --host 127.0.0.1
  ```

  The upstream HTTP service has no authentication and is bound to
  `127.0.0.1:8000`; `/healthz` checks readiness without exposing credentials.
  Python 3.12 is recommended (the package supports Python 3.10+). If the
  service is unavailable, Lumin uses clearly labeled sample data. Disconnect
  only stops Lumin imports; upstream logout or token removal is a separate
  terminal action and Lumin never deletes those files.
  
