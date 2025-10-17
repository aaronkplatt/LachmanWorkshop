#!/bin/bash

# Next.js + Firebase Template Setup Script
# This script helps you quickly configure the template for your project

set -e

echo "🚀 Next.js + Firebase Template Setup"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+ first."
        exit 1
    fi
    
    if ! command -v yarn &> /dev/null; then
        print_error "Yarn is not installed. Please install Yarn first."
        exit 1
    fi
    
    if ! command -v firebase &> /dev/null; then
        print_warning "Firebase CLI is not installed. Installing now..."
        npm install -g firebase-tools
    fi
    
    print_success "All requirements met!"
}

# Get project information
get_project_info() {
    echo ""
    print_status "Let's configure your project..."
    
    read -p "Enter your project name: " PROJECT_NAME
    read -p "Enter your project description: " PROJECT_DESCRIPTION
    read -p "Enter your Firebase project ID (or leave empty to create new): " FIREBASE_PROJECT_ID
    
    # Sanitize project name for use in files
    PROJECT_NAME_SANITIZED=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g')
}

# Update package.json
update_package_json() {
    print_status "Updating package.json..."
    
    # Create backup
    cp package.json package.json.backup
    
    # Update package.json with new project info
    jq --arg name "$PROJECT_NAME_SANITIZED" \
       --arg description "$PROJECT_DESCRIPTION" \
       '.name = $name | .description = $description' \
       package.json > package.json.tmp && mv package.json.tmp package.json
    
    print_success "package.json updated!"
}

# Update Firebase configuration
update_firebase_config() {
    print_status "Updating Firebase configuration..."
    
    if [ -n "$FIREBASE_PROJECT_ID" ]; then
        # Update .firebaserc with provided project ID
        jq --arg project "$FIREBASE_PROJECT_ID" \
           '.projects.default = $project' \
           .firebaserc > .firebaserc.tmp && mv .firebaserc.tmp .firebaserc
        print_success "Firebase project ID set to: $FIREBASE_PROJECT_ID"
    else
        print_warning "You'll need to set up Firebase project manually"
        print_status "Run: firebase init"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install main app dependencies
    yarn install
    
    # Install Firebase Functions dependencies
    cd functions
    npm install
    cd ..
    
    print_success "Dependencies installed!"
}

# Create environment template
create_env_template() {
    print_status "Creating environment template..."
    
    cat > .env.template << EOF
# Firebase Configuration
# Add your Firebase config here if needed

# Mailchimp Configuration (set these in Firebase Functions)
# MAILCHIMP_API_KEY=your_mailchimp_api_key
# MAILCHIMP_LIST_ID=your_mailchimp_list_id
# MAILCHIMP_SERVER_PREFIX=your_mailchimp_server_prefix

# reCAPTCHA Configuration (set these in Firebase Functions)
# RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Note: Environment variables for Firebase Functions should be set using:
# firebase functions:secrets:set VARIABLE_NAME
# or during deployment with: firebase deploy --only functions
EOF
    
    print_success "Environment template created!"
}

# Create setup instructions
create_setup_instructions() {
    print_status "Creating setup instructions..."
    
    cat > SETUP_INSTRUCTIONS.md << EOF
# Setup Instructions for $PROJECT_NAME

## Quick Setup Checklist

### 1. Firebase Setup
- [ ] Create Firebase project: https://console.firebase.google.com
- [ ] Enable Hosting, Functions, and Firestore
- [ ] Update \`.firebaserc\` with your project ID
- [ ] Upgrade to Blaze plan (required for Functions)

### 2. Mailchimp Setup
- [ ] Create Mailchimp account: https://mailchimp.com
- [ ] Get API key from Account → Extras → API Keys
- [ ] Get List ID from Audience → Settings → Audience name and defaults
- [ ] Note your server prefix (e.g., us1, us2)

### 3. reCAPTCHA Setup
- [ ] Create reCAPTCHA site: https://www.google.com/recaptcha/admin
- [ ] Choose reCAPTCHA v2 "I'm not a robot" Checkbox
- [ ] Add your domains (including Firebase hosting domain)
- [ ] Get Site Key and Secret Key

### 4. Environment Variables
Set these in Firebase Functions:
\`\`\`bash
firebase functions:secrets:set MAILCHIMP_API_KEY
firebase functions:secrets:set MAILCHIMP_LIST_ID
firebase functions:secrets:set MAILCHIMP_SERVER_PREFIX
firebase functions:secrets:set RECAPTCHA_SECRET_KEY
\`\`\`

### 5. Update reCAPTCHA Site Key
- [ ] Update the reCAPTCHA site key in \`src/components/Newsletter.tsx\`

### 6. Customize Content
- [ ] Update text content in \`src/components/\`
- [ ] Replace images in \`public/\`
- [ ] Update branding and colors
- [ ] Test newsletter signup

### 7. Deploy
\`\`\`bash
# Deploy everything
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only functions
\`\`\`

## Next Steps

1. **Customize the design** - Update components in \`src/components/\`
2. **Add your content** - Replace placeholder text and images
3. **Configure analytics** - Add Google Analytics or Firebase Analytics
4. **Set up custom domain** - Configure in Firebase Console
5. **Test thoroughly** - Ensure newsletter signup works correctly

## Support

- Check the main README.md for detailed documentation
- Review Firebase Console for logs and monitoring
- Test functions locally: \`firebase emulators:start\`
EOF
    
    print_success "Setup instructions created!"
}

# Main setup function
main() {
    echo ""
    print_status "Starting template setup..."
    
    check_requirements
    get_project_info
    update_package_json
    update_firebase_config
    install_dependencies
    create_env_template
    create_setup_instructions
    
    echo ""
    print_success "Template setup complete! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Review SETUP_INSTRUCTIONS.md for detailed setup steps"
    echo "2. Set up your Firebase project"
    echo "3. Configure Mailchimp and reCAPTCHA"
    echo "4. Customize your content"
    echo "5. Deploy your app"
    echo ""
    echo "Happy coding! 🚀"
}

# Run the setup
main "$@" 