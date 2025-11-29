server {
    listen 443 ssl;
    server_name api.momentkaph.sk;

    # SSL logic (for SSL handshake using certificates)
    ssl_certificate /etc/letsencrypt/live/api.momentkaph.sk/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.momentkaph.sk/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    # block bad bots
    if ($is_bad_bot) {
        return 418; # I'm a teapot
    }

    # Rate limiting applied to all endpoints
    limit_req zone=api_req_limit burst=0 nodelay;
    limit_conn api_conn_limit 2;

    # request timeouts to prevent hanging connections
    proxy_connect_timeout 60;
    proxy_send_timeout 60;
    proxy_read_timeout 60;
    send_timeout 60;

    # add security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Security-Policy "default-src 'self'";
    add_header X-Permitted-Cross-Domain-Policies "none";

    # Email sending endpoint
    location = /email_sending {
        # backend handling
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Cloud storage endpoint with parameter
    location ~ ^/cloud_storage/(weddings|portrait|love-story|family|studio|pregnancy|baptism|newborn)$ {
        # backedn handling
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
}

    location / {
        return 404;
    }

}

server {
    listen 80;
    server_name api.momentkaph.sk;
    
    if ($host = api.momentkaph.sk) {
        return 301 https://$host$request_uri;
    }
}