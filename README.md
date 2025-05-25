
## Beauty Boost Loyalty App

**Beauty Boost Loyalty App** is a customer engagement and rewards platform designed specifically for beauty salons, spas, and related businesses. This application streamlines customer retention by offering a seamless, digital solution for managing loyalty programs, promotions, and client relationships.

In addition to core loyalty and engagement features, the app provides a robust backend simulation using a comprehensive DataService layer. All user data—including profiles, points, bookings, rewards, and transaction history—is persistently stored, ensuring data survives page refreshes and browser restarts. The system supports real-time updates, so all components automatically reflect changes as they happen. A built-in tier system automatically calculates user status (Bronze → Silver → Gold → Platinum) based on points. The app also maintains a full transaction history, providing an audit trail of all point earnings and redemptions.The admin dashboard now updates in real-time with customer appointments, featuring automatic refresh every 30 seconds, manual refresh capability, and live appointment tracking with timestamps for up-to-the-minute management.

---



## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployed Project

🌐 [View the live app here](https://beauty-boost-loyalty-app.vercel.app/)

---

## AI Prompts Used

The development and documentation of this project were guided by a comprehensive AI prompt to ensure the highest quality across all judging criteria. The following prompt was used to drive the planning, features, and documentation of the Beauty Boost Loyalty App:

> Let us create a loyalty rewards application for a beauty salon. Creating a loyalty rewards application for a beauty salon requires careful consideration across various dimensions, especially given the judging criteria you've outlined. Below are detailed requirements tailored to each metric.
> 
> ## Application Requirements
>
> ### 1. **User Experience (UX) and User Interface (UI)**
> - **Clean Design**: 
>   - Minimalistic layout with a cohesive color palette that reflects the salon's brand.
>   - Intuitive navigation with clear buttons and icons.
>
> - **Animations and Cues**:
>   - Smooth transitions between screens (e.g., page sliding, fading).
>   - Subtle audio cues for actions like earning points or booking appointments.
>
> - **Engagement Features**:
>   - “Wow” moments such as confetti animations when points are redeemed.
>   - Personalized greetings and recommendations based on user preferences.
>
> ### 2. **Functionality**
> - **User Registration and Profiles**:
>   - Easy sign-up process (social media integration, email).
>   - User profiles that display points, redeemable rewards, and booking history.
>
> - **Loyalty Points System**:
>   - Clear structure for earning points (e.g., per visit, bonus for referrals).
>   - Tiered rewards to encourage higher spending (e.g., basic, silver, gold levels).
>
> - **Booking Integration**:
>   - Seamless appointment booking directly through the app.
>   - Notifications and reminders for upcoming appointments.
>
> - **Rewards Redemption**:
>   - Simple interface for users to redeem points for services/products.
>   - Special promotions or double points days to incentivize visits.
>
> ### 3. **Technical Requirements**
> - **Backend Architecture**:
>   - RESTful API for data management (users, appointments, rewards).
>   - Database for storing user data securely (e.g., Firebase, MongoDB).
>
> - **Code Quality**:
>   - Modular code structure to allow for easy updates and collaboration.
>   - Use of version control (e.g., Git) for code management.
>
> - **Innovative Features**:
>   - AI-driven recommendations for services based on user history.
>   - Gamification elements (e.g., challenges, badges).
>
> ### 4. **Security and Reliability**
> - **Data Protection**:
>   - Encryption for user data storage and transactions.
>   - Compliance with data protection regulations (e.g., GDPR).
>
> - **Error Handling**:
>   - Graceful degradation if certain features fail (e.g., fallback messages).
>   - Comprehensive logging for tracking issues.
>
> ### 5. **Testing and Documentation**
> - **Thorough Testing**:
>   - Unit tests for individual functions and features.
>   - User acceptance testing (UAT) to gather feedback before launch.
>
> - **Documentation**:
>   - Clear README file outlining setup steps, features, and usage.
>   - API documentation for future developers.
>
> ### 6. **Pitch Presentation**
> - **Problem Understanding**:
>   - Clearly outline the need for a loyalty program in beauty salons (e.g., customer retention).
>
> - **Solution Presentation**:
>   - Demonstrate the app's prototype through a live demo or video walkthrough.
>   - Highlight unique AI-driven features.
>
> - **Market Insights**:
>   - Define target demographics (e.g., age, preferences).
>   - Present data on market growth potential in the beauty industry.
>
> - **Business Model**:
>   - Explain revenue streams (e.g., partnerships, premium features).
>   - Discuss scalability options (e.g., expanding to multiple locations).
>
> - **Visual Appeal**:
>   - Use a professional pitch deck with visuals that complement the spoken content.
>   - Ensure clarity in delivery, with rehearsed transitions between sections.
>
> Please make sure I score high on this hackathon as having the best project ever. Also help out with detailed documentation of the application.

---

## Key Features

- **Digital Loyalty Cards:** Customers earn points or stamps with every visit or purchase, redeemable for exclusive rewards and discounts.
- **Personalized Offers:** Businesses can send customized promotions, birthday rewards, and targeted marketing campaigns directly to clients.
- **Appointment Management:** Users can book, modify, and receive reminders for appointments within the app.
- **Client Profiles:** Maintain detailed client histories, preferences, and contact details to deliver tailored experiences.
- **Analytics Dashboard:** Track reward redemptions, customer activity, and campaign performance with insightful reports.
- **Push Notifications:** Instantly notify clients about new offers, upcoming appointments, or special events.
- **Multi-Store Support:** Support for franchises or businesses with multiple locations, allowing centralized management and reporting.

#### Advanced Data Simulation & Management

- **DataService:** Complete backend simulation including user profiles, points, bookings, rewards, and transaction history.
- **Persistent Storage:** All data survives page refreshes and browser restarts, ensuring a seamless user experience.
- **Real-time Updates:** UI components automatically update whenever underlying data changes for instant feedback.
- **Tier System:** Automatic tier calculation based on points (Bronze → Silver → Gold → Platinum).
- **Transaction History:** Full audit trail of all point earnings and redemptions for transparency and accountability.

#### Data Management

- User profiles with tier progression and detailed information.
- Points earning and redemption system for loyalty and rewards.
- Booking management with real-time status tracking.
- Service history tracking for every user.
- Redeemed rewards tracking to monitor customer engagement.

#### Admin Dashboard

- **Real-Time Appointment Updates:** The admin dashboard displays customer appointments and refreshes automatically every 30 seconds.
- **Manual Refresh:** Option to manually refresh the dashboard data at any time.
- **Live Appointment Tracking:** Monitor appointments with real-time timestamps for accurate and efficient management.

---

## Benefits

- Boosts customer retention and repeat visits through gamification and rewards.
- Reduces reliance on paper cards and manual tracking.
- Enhances marketing effectiveness with data-driven insights.
- Improves operational efficiency with integrated booking and client management.

---

## Typical Users

- Beauty salons
- Spas and wellness centers
- Barbershops
- Nail and brow studios
- Any business seeking to reward and retain loyal clients

---

## Getting Started

1. **Clone the repository:**  
   `git clone https://github.com/EngShekinah/beauty-boost-loyalty-app.git`
2. **Install dependencies:**  
   `npm install` or `yarn install`
3. **Configure environment variables:**  
   Add your API keys and configuration in `.env`
4. **Run the app:**  
   `npm start` or `yarn start`

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for feature requests and bug fixes.

---

Empower your beauty business with smarter customer engagement and seamless loyalty management!
````






































































































































