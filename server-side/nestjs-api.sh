server {
    listen 443 ssl; # accept TCP connections on port 443 and and treat these connections as HTTPS (use SSL/TLS)
    server_name api.momentkaph.sk; # nginx looks for SNI (server name indication) on the request and finds that distinct server segment

    # block bad bots
    if ($is_bad_bot) {
        return 418; # I'm a teapot
    }

    # enforce correct case-sensitive hostname and prevent attacks as direct IP access, etc.
    if ($host !~ ^api\.momentkaph\.sk$) {
    return 421; # Misdirected Request
    }

    # Handle preflight requests -> OPTIONS preflight requests are for non-simple requests and tell the browser what is actually allowed to send on this BE
    if ($request_method = 'OPTIONS') {
        add_header Access-Control-Allow-Origin "https://www.momentkaph.sk" always; # only from this origin
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always; # only these methods
        add_header Access-Control-Allow-Headers "Content-Type" always; # with Content-Type header -> in future, i want Authorization implements too
        add_header Access-Control-Max-Age "3600" always; # tells the browser how long he can cache this headers, in this case 1 hour, then it must send another OPTIONS preflight request before actual request
        return 204; # No Content -> standart response for OPTIONS
    }

    # SSL/TLS logic (for TLS handshake using certificates) -> on network layer with TCP and TLS above it connection before actual HTTPS connection -> for proving to browser i am api.momentkaph.sk
    # Cerbot is ACME client, who orchestrate certificate renewal -> add location for challenge automatically if cerbot nginx is used -> needs to test out if webroot is not used here
    ssl_certificate /etc/letsencrypt/live/api.momentkaph.sk/fullchain.pem; # public part with intermediate
    ssl_certificate_key /etc/letsencrypt/live/api.momentkaph.sk/privkey.pem; # private part for *.momentkaph.sk
    include /etc/letsencrypt/options-ssl-nginx.conf; # TLS settings prefered by Cerbot/nginx
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # use stronger cipher suites/ perform Diffle-Hellman key exchange
    # add CA trusted certificates ??

    # Rate limiting applied to all endpoints
    limit_req zone=api_req_limit burst=0; # no additional request allowed (burst-0)
    limit_conn api_conn_limit 2; # max 2 concurent request from one IP

    # request timeouts to prevent hanging connections
    proxy_connect_timeout 10; # 60 sec is default; connection to localhost BE server is in milliseconds
    proxy_send_timeout 10; # 60 sec is default; timeout set between two successive write operations, not for the transmission of the whole request.
    proxy_read_timeout 10; # 60 sec is default; timeout for reading two successive read operations, not for the transmission of the whole response.

    # add security headers to responses
    add_header Strict-Transport-Security "max-age=31536000" always; # enforce HTTPS for 1 year
    add_header X-Content-Type-Options "nosniff"; # prevents browsers from guessing MIME types and forces them to stick with the declared content type

    # CORS headers -> for browser to know from response with those headers who is allowed to access resources, browser enforces CORS policy then
    add_header Access-Control-Allow-Origin "https://www.momentkaph.sk" always;
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type" always;
    add_header Access-Control-Max-Age "3600" always;

    # Proxy setup
    proxy_http_version 1.1; # use HTTP/1.1 to support keep-alive connections to backend

    # Proxy buffering settings -> per-request resources
    proxy_buffering on; # default is on; enable buffering of responses from the proxied server
    proxy_buffer_size 4kb; # default is 4k or 8k; size of the buffer used for reading the first part of the response (headers) from the proxied server
    proxy_buffers 8 8k; # default is 8 4k or 8 8k; number and size of buffers used for reading a response from the proxied server
    proxy_busy_buffers_size 32k; # default is 8k or 16k; size of buffers that can be busy sending a response to the client while the response is not yet fully read.

    # Shared proxy headers to backend services
    proxy_set_header Host $host; # pass the original Host header
    proxy_set_header X-Real-IP $remote_addr; # pass the client IP address
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # pass the original X-Forwarded-For header -> list of IPs through which request passed; not useful in my case, but standard practice
    proxy_set_header X-Forwarded-Proto $scheme; # pass the original protocol (http or https) used by the client
    proxy_set_header Connection ""; # disable connection header to allow keep-alive connections to backend

    # Email sending endpoint, 
    location = /email_sending {
        limit_except POST { # allow only POST requests on this uri
            deny all;
        }
        # backend handling
        proxy_pass http://localhost:3000$uri$is_args$args; # default is $uri without args -> $uri is decoded/normalized version of original request URI -> safer
    }

    # Cloud storage endpoint with parameter
    location ~ ^/cloud_storage/(weddings|portrait|love-story|family|studio|pregnancy|baptism|newborn)$ {
        limit_except GET { # allow only GET requests on this uri
            deny all;
        }
        # backend handling
        proxy_pass http://localhost:3000$uri$is_args$args;
}

    location / { # all other uri-s
        return 404;
    }

}

erver {
    listen 80;
    server_name api.momentkaph.sk;
    
    # redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}
