user momentkaph; # User and group for worker processes
worker_processes auto; # Adjust based on CPU cores
pid /run/nginx.pid; # File to store the process ID
error_log /var/log/nginx/error.log; # Log file for errors

events {
        worker_connections 512; # Increase if you have lots of clients
        use epoll;  # More efficient connection processing on Linux
        multi_accept on; # Accept multiple connections at once
}

http {

        # Basic Settings
        sendfile on; # Enable sendfile for better performance
        tcp_nopush on; # Improve file transfer performance
        tcp_nodelay on; # Improve small packet performance
        types_hash_bucket_size 64; # Increase if you have long file names
        types_hash_max_size 2048; # Increase if you have lots of file types
        server_tokens off; # Hide nginx version number for security

        include /etc/nginx/mime.types; # Map file extensions to MIME types
        default_type application/octet-stream; # Default MIME type

        # Aggressive Rate Limiting - Single Zone Strategy
        # Using a single unified zone reduces memory overhead and simplifies management
        # 10m zone can track ~160,000 unique IP addresses
        # 10 requests per second
        limit_req_zone $binary_remote_addr zone=api_req_limit:10m rate=10r/s;
        limit_conn_zone $binary_remote_addr zone=api_conn_limit:10m; # 10 open concurrent connections per IP
        limit_req_status 429;
        limit_conn_status 429;

        # Aggressive Timeout Settings
        client_header_timeout 10s; # 10 seconds to waits for client to send headers
        client_body_timeout 15s; # 15 seconds to waits for client to send request body (for POST requests)
        keepalive_timeout 30s; # 30 seconds idle keepalive connections stays open
        send_timeout 15s; # 15 seconds to transmit response to client
        client_max_body_size 5m; # Maximum allowed size of client request body
        
        # Buffer sizes (smaller = less memory, but might need tuning based on your API)
        client_body_buffer_size 16k;
        client_header_buffer_size 1k;
        large_client_header_buffers 4 8k;

        # SSL Settings
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;


        # Logging Settings
        log_format detailed '$remote_addr - $remote_user [$time_local] '
                       '"$request" $status $body_bytes_sent '
                       '"$http_referer" "$http_user_agent" '
                       'rt=$request_time uct="$upstream_connect_time" '
                       'uht="$upstream_header_time" urt="$upstream_response_time"';
        access_log /var/log/nginx/access.log detailed;

        gzip on;

        # Virtual Host Configs
        include /etc/nginx/conf.d/*.conf; # Include all configuration files in conf.d
        include /etc/nginx/sites-enabled/*; # Include all enabled site configurations
}

