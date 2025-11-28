server {
    listen 443 ssl;
    server_name api.momentkaph.sk;

    # block bad bots
    if ($is_bad_bot) {
        set $block_bot 1;
    }
    if ($is_search_bot) {
        set $block_bot 0; # allow search engine bots
    }
    if ($block_bot) {
        return 418; # I'm a teapot
    }

    # Block requests containing suspicious commands
    location ~* "(wget|curl|rm|eval|bash|sh)" {
        return 444;
    }

    # handle bots requests
    location ~ /(\.env|\.git|credentials|conf|ini|sh|bak|log|\.cgi) {
        deny all;
        return 404;
    }

    location / {
        # Rate limiting
        limit_req zone=one burst=4;

        # Proxy settings
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

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
    }

    # SSL logic (for SSL handshake using certificates)
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/api.momentkaph.sk/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/api.momentkaph.sk/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = api.momentkaph.sk) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name api.momentkaph.sk;
    return 418; # managed by Certbot


}