# Build
pushd ui
npm run build
popd

printf "%s" $(date +%F-%T) > version.txt

# Copy to production
ssh -i ~/keys/cs260/id_rsa root@cs260.click 'mkdir -p /var/www/cp4/public' 
scp -i ~/keys/cs260/id_rsa -r ui/dist/* root@cs260.click:/var/www/cp4/public

scp -i ~/keys/cs260/id_rsa *.js *.json version.txt root@cs260.click:/var/www/cp4/
ssh -i ~/keys/cs260/id_rsa root@cs260.click 'cd /var/www/cp4; npm install' 

# Test it is running
ssh -i ~/keys/cs260/id_rsa root@cs260.click "curl -i -s localhost:20400/api/version; printf '\n---------\n'"

# Check out the result
# open -a "Google Chrome" "https://cp4.cs260.click"

# Run only once - Make server a daemon
# pm2 start --name cp4 server.js --watch --ignore-watch="node_modules"
# pm2 save

# Run only once - Get certificate
# certbot --nginx -d cp4.cs260.click


# Configure /etc/nginx/sites-available/default
# service nginx reload

# server {
#     root /var/www/cp4/public;

#     location /api {
#         proxy_pass http://localhost:20400;
#     }
# }
