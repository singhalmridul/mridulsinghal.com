# Production Deployment Handover Guide
**Domain:** mridulsinghal.com  
**Infrastructure:** Docker-based (Traefik v3 + Next.js)  
**Location:** `/srv/docker` on VPS

---

## 1. Architecture Overview
The system follows a "Clean Docker" architecture. Nothing runs directly on the host OS except Docker Engine.

-   **Proxy Layer** (`/srv/docker/proxy`):
    -   **Traefik v3**: Single entry point for all traffic.
    -   **Ports**: Binds 80 (HTTP) and 443 (HTTPS).
    -   **Network**: `proxy-net` (External Docker Network).
    -   **SSL**: Automatically managed via Let's Encrypt (`acme.json`).

-   **Application Layer** (`/srv/docker/mridulsinghal.com`):
    -   **Next.js Container**: Runs the portfolio website.
    -   **Ports**: NONE exposed to host. Only reachable internally by Traefik.
    -   **Network**: attached to `proxy-net`.

## 2. Server Directory Structure
```
/srv/docker/
├── proxy/
│   ├── docker-compose.yml    # Traefik configuration
│   └── data/
│       └── acme.json         # SSL Certificates (DO NOT DELETE)
└── mridulsinghal.com/
    ├── docker-compose.yml    # Portfolio configuration
    └── deploy_bundle.tar.gz  # Transient deployment artifact
```

## 3. Redeployment Steps
To update the website with new code:

**Step 1: Local - Build & Bundle**
Run this from your local project root:
```bash
# Create a deployment bundle (excluding heavy local folders)
tar --exclude='node_modules' --exclude='.next' --exclude='.git' \
    -czf deploy_bundle.tar.gz .
```

**Step 2: Transfer**
```bash
scp deploy_bundle.tar.gz root@72.62.79.187:/srv/docker/mridulsinghal.com/
```

**Step 3: Remote - Deploy**
```bash
ssh root@72.62.79.187
cd /srv/docker/mridulsinghal.com/

# Extract (overwriting logic typically handled by script, but manual steps:)
tar -xzf deploy_bundle.tar.gz

# Rebuild and restart NO DOWNTIME (rolling update if scaled, otherwise brief restart)
docker compose up -d --build --force-recreate

# Clean up
docker image prune -f
```

## 4. How to Add a New Website
To host `new-project.com` alongside the portfolio without touching the proxy:

1.  **DNS**: Point `new-project.com` A record to `72.62.79.187`.
2.  **Create Directory**: `mkdir -p /srv/docker/new-project.com`
3.  **Create docker-compose.yml**:
    ```yaml
    services:
      web:
        image: nginx:alpine # Or your app image
        networks:
          - proxy-net
        labels:
          - "traefik.enable=true"
          - "traefik.http.routers.newproject.rule=Host(`new-project.com`)"
          - "traefik.http.routers.newproject.entrypoints=websecure"
          - "traefik.http.routers.newproject.tls.certresolver=myresolver"

    networks:
      proxy-net:
        external: true
    ```
4.  **Deploy**: `docker compose up -d`

Traefik will detect the new container, auto-generate SSL, and start routing traffic immediately.

## 5. Maintenance & Debugging
-   **Check Proxy Logs**: `docker logs -f traefik`
-   **Check App Logs**: `docker logs -f mridulsinghal-portfolio`
-   **Restart Proxy**: `cd /srv/docker/proxy && docker compose restart` (Only needed if Traefik itself hangs, unlikely)
-   **Renew SSL**: Automatic. No action required.
