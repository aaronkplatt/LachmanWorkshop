# Next.js + Firebase Template 🚀

A production-ready template for building modern web applications with Next.js 15, Firebase, and comprehensive security features. **Super easy Firebase setup** with environment variables - just plug in your credentials and everything works!

Perfect for startups, small businesses, or personal projects that need a solid foundation.

## ✨ What's Included

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Sass
- **Firebase Integration**: Hosting, Functions, Firestore
- **Optional Newsletter System**: Mailchimp integration with backup storage (see `src/mockFeatures/`)
- **Security Features**: reCAPTCHA, rate limiting, domain restrictions
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Responsive Design**: Bootstrap 5 with modern UI components and custom Sass variables
- **Production Ready**: Error handling, logging, monitoring

## 🎯 Perfect For

- **Business Websites** - Professional landing pages with newsletter signup
- **Startup MVPs** - Quick deployment with scalable backend
- **Portfolio Sites** - Showcase work with contact forms
- **E-commerce Landing Pages** - Product showcases with lead capture
- **Personal Projects** - Blogs, portfolios, or side projects

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone this template
git clone <your-template-repo>
cd your-project-name

# Install dependencies
yarn install
cd functions && yarn install && cd ..
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp env.example .env

# Fill in your Firebase credentials (see setup instructions below)
```

### 3. Configure Firebase

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "my-awesome-project")
4. Enable Google Analytics (optional)
5. Click "Create project"

#### Enable Required Services
In your Firebase Console, enable these services:

**Hosting:**
1. Go to **Hosting** in the left sidebar
2. Click "Get started"
3. Follow the setup wizard

**Firestore Database:**
1. Go to **Firestore Database** in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode"
4. Select a location close to your users

**Functions (requires Blaze plan):**
1. Go to **Functions** in the left sidebar
2. Click "Get started"
3. You'll be prompted to upgrade to Blaze plan (pay-as-you-go)

#### Get Your Firebase Config
1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon `</>`
4. Register your app with a nickname (e.g., "My Web App")
5. Copy the config object

#### Update Your .env File
Fill in your Firebase config in `.env`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
FIREBASE_PROJECT_ID=your-project-id
```

### 4. Install Firebase CLI

```bash
yarn global add firebase-tools
firebase login
```

### 5. Initialize Firebase in Your Project

```bash
firebase init
```

Select these options:
- ✅ Hosting: Configure files for Firebase Hosting
- ✅ Functions: Configure a Cloud Functions directory
- ✅ Firestore: Configure security rules and indexes

When prompted:
- **Project**: Select your project from the list
- **Public directory**: `out` (for Next.js static export)
- **Single-page app**: Yes
- **Functions language**: TypeScript
- **ESLint**: Yes
- **Install dependencies**: Yes

### 6. Configure Hosting Targets (One-time setup)

```bash
# Set up production hosting target
firebase target:apply hosting production your-project-id

# Set up QA hosting target (if you have one)
firebase target:apply hosting qa qa-your-project-id
```

### 7. Deploy

```bash
# Build and deploy everything
yarn build
firebase deploy
```

🎉 **You're done!** Your app should be live at `https://your-project.web.app`

### 8. Test Your Function

Your Firebase Functions include a simple Hello World function:

```bash
# Test the function locally
firebase emulators:start --only functions

# Or test the deployed function
curl https://us-central1-your-project-id.cloudfunctions.net/helloWorld
```

## 🔧 GitHub Actions Setup (Optional)

For automatic deployments, set up GitHub Secrets:

### Required GitHub Secrets:
1. **FIREBASE_SERVICE_ACCOUNT_KEY**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Copy the entire JSON content and paste it as the secret value

### Branch Strategy:
- **`main` branch** → Deploys to **Production**
- **`develop` branch** → Deploys to **QA**
- **Pull requests** → Build and test only

### Initial Setup (One-time):
```bash
# Configure hosting targets locally first
firebase target:apply hosting production your-project-id
firebase target:apply hosting qa qa-your-project-id
```

## 📋 Setup Checklist

- [ ] **Firebase Project** created and configured
- [ ] **Environment Variables** set in `.env`
- [ ] **Firestore Database** initialized
- [ ] **Firebase Functions** enabled
- [ ] **Firebase CLI** installed and logged in
- [ ] **Hosting targets** configured
- [ ] **GitHub Secrets** configured (if using CI/CD)
- [ ] **Test deployment** with `yarn build && firebase deploy`

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 15.3.3 |
| **React** | UI Library | 19.0.0 |
| **TypeScript** | Type Safety | 5.x |
| **Sass** | CSS Preprocessor | Latest |
| **Firebase Hosting** | Static Site Hosting | Latest |
| **Firebase Functions** | Serverless API | Node.js 22 |
| **Firestore** | Database | Latest |
| **Bootstrap** | CSS Framework | 5.3.3 |

## 📁 Project Structure

```
your-project/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── components/     # React components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── page.tsx        # Main homepage
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── lib/
│   │   └── firebase.ts     # Firebase configuration
│   ├── styles/             # Sass stylesheets
│   │   ├── _variables.scss # Design system variables
│   │   └── main.scss       # Main stylesheet
│   └── mockFeatures/       # Optional features (Newsletter, etc.)
│       ├── Newsletter.tsx  # Newsletter component (disabled by default)
│       └── README.md       # Instructions to enable features
├── functions/              # Firebase Functions
│   ├── src/
│   │   ├── index.ts        # Hello World function
│   │   └── newsletter.ts   # Newsletter function (commented out)
│   └── package.json        # Function dependencies
├── .github/workflows/      # CI/CD workflows
│   └── deploy.yml         # Automatic deployment workflow
├── public/                 # Static assets
├── firebase.json           # Firebase configuration
├── .firebaserc            # Firebase project settings
├── env.example            # Environment variables template
└── package.json           # Main app dependencies
```

## 🎨 Customization

### Sass Variables
The template includes a comprehensive design system with Sass variables:

```scss
// Primary colors
$primary: #ffc107;
$secondary: #6c757d;
$accent: #0d6efd;

// Custom components
.btn-primary-custom { /* ... */ }
.section-primary { /* ... */ }
```

### CSS Custom Properties
For runtime theming, CSS custom properties are available:

```css
:root {
  --color-primary: #ffc107;
  --color-secondary: #6c757d;
  --color-accent: #0d6efd;
}
```

### Custom Components
- **Custom buttons**: `.btn-primary-custom`, `.btn-secondary-custom`, `.btn-accent-custom`
- **Custom sections**: `.section-primary`, `.section-secondary`, `.section-dark`, `.section-accent`
- **Utility classes**: `.text-primary-custom`, `.bg-accent-custom`, `.hover-lift`, `.fade-in`

## 🔍 Troubleshooting

### Common Issues:

**"Firebase project not found"**
- Make sure you've run `firebase use your-project-id`
- Check that your project ID is correct in `.firebaserc`

**"Functions deployment failed"**
- Make sure you're on the Blaze plan
- Check that all environment variables are set
- Look at the Firebase Console logs for detailed error messages

**"Sass compilation error"**
- Make sure you have `sass` installed: `yarn add sass`
- Check that your Sass variables use actual color values, not CSS custom properties

**"Build failed"**
- Run `yarn lint` to check for linting errors
- Make sure all dependencies are installed: `yarn install`
- Check the console for specific error messages

### Getting Help:
- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Look at the [Next.js Documentation](https://nextjs.org/docs)
- Check the Firebase Console logs for detailed error messages

## 🚀 Next Steps

After setup, you can:
- Customize the components in `src/components/`
- Add your own branding and content
- Set up a custom domain
- Add more Firebase services (Auth, Storage, etc.)
- Enable newsletter functionality (see `src/mockFeatures/`)
- Deploy to production with GitHub Actions

## 📚 Additional Resources

- [Firebase CLI Documentation](https://firebase.google.com/docs/cli)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Sass Documentation](https://sass-lang.com/documentation)

Happy coding! 🚀