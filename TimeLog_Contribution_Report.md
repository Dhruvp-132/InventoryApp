# PROG2005 Programming Mobile Systems
## Assessment 3 - Time Log and Contribution Report

**Student Name:** [Your Name]  
**Student ID:** [Your Student ID]  
**Date:** [Current Date]

---

## 1. Work Duration and Timing

### Individual Work Sessions

| Date | Start Time | End Time | Duration | Location | Team Member(s) |
|------|------------|----------|----------|----------|----------------|
| [Date 1] | [Time] | [Time] | [Hours] | [Location] | Individual |
| [Date 2] | [Time] | [Time] | [Hours] | [Location] | Individual |
| [Date 3] | [Time] | [Time] | [Hours] | [Location] | Individual |
| [Date 4] | [Time] | [Time] | [Hours] | [Location] | Individual |
| [Date 5] | [Time] | [Time] | [Hours] | [Location] | Individual |

**Total Hours Worked:** [Total Hours]

*Note: If working in a team, add team member names and specify when working together.*

---

## 2. Task Breakdown

### Session 1: [Date] - [Time Duration]

**Tasks Completed:**
- Set up Ionic Angular project structure
- Created basic tab navigation with 4 tabs (Home, Add Item, Manage, Privacy)
- Configured routing and navigation modules
- Set up basic project dependencies and imports

**Challenges Encountered:**
- Understanding Ionic component structure
- Setting up proper module imports

**Time Spent:** [Hours]

---

### Session 2: [Date] - [Time Duration]

**Tasks Completed:**
- Created InventoryService with HTTP client integration
- Implemented RESTful API methods (GET, POST, PUT, DELETE)
- Configured API endpoint connection to https://prog2005.it.scu.edu.au/ArtGalley
- Created InventoryItem interface with proper TypeScript types
- Tested API connectivity and response handling

**Challenges Encountered:**
- Understanding Observable patterns in Angular
- Handling different API response formats
- Type mapping between server response and client model

**Time Spent:** [Hours]

---

### Session 3: [Date] - [Time Duration]

**Tasks Completed:**
- Implemented Tab 1 (Inventory List) functionality
- Created item listing with search functionality
- Implemented search by item name feature
- Added loading indicators and error handling
- Created help dialog for Tab 1
- Styled UI with Ionic components (cards, lists, badges)

**Challenges Encountered:**
- Mapping server response data to client model
- Implementing search functionality
- Handling empty states and error cases

**Time Spent:** [Hours]

---

### Session 4: [Date] - [Time Duration]

**Tasks Completed:**
- Implemented Tab 2 (Add Item) functionality
- Created form with all required fields (name, category, quantity, price, supplier, stock status)
- Added featured item toggle functionality
- Implemented featured items list display
- Added form validation (required fields, numeric validation)
- Created help dialog for Tab 2
- Implemented POST request to add new items

**Challenges Encountered:**
- Form validation logic
- Converting form data to API payload format (snake_case)
- Handling featured items filtering

**Time Spent:** [Hours]

---

### Session 5: [Date] - [Time Duration]

**Tasks Completed:**
- Implemented Tab 3 (Manage Items) functionality
- Created search functionality to load items for editing
- Implemented update item feature (PUT request)
- Implemented delete item feature (DELETE request)
- Added confirmation dialog for delete operations
- Created help dialog for Tab 3
- Added form validation for edit operations

**Challenges Encountered:**
- Handling item updates with proper payload structure
- Implementing delete confirmation flow
- Managing form state after operations

**Time Spent:** [Hours]

---

### Session 6: [Date] - [Time Duration]

**Tasks Completed:**
- Implemented Tab 4 (Privacy & Security) page
- Added privacy and security information content
- Created help dialog for Tab 4
- Simplified code structure and removed unnecessary complexity
- Code cleanup and optimization
- Testing all CRUD operations
- Fixed bugs and improved error handling

**Challenges Encountered:**
- Simplifying code while maintaining functionality
- Ensuring all assessment requirements are met

**Time Spent:** [Hours]

---

### Session 7: [Date] - [Time Duration]

**Tasks Completed:**
- Final testing of all features
- UI/UX improvements
- Code review and documentation
- Preparation of time log and contribution report

**Time Spent:** [Hours]

---

## 3. GenAI Documentation

### Use of Generative AI in Assessment

I utilized Generative AI tools (specifically Cursor AI assistant) during the development of this assessment, strictly adhering to the permitted usage guidelines outlined in the assessment brief. My use of GenAI was limited to research, troubleshooting, and learning purposes, and I did not use it to generate any code or write any part of this report.

**Research and Problem Formulation:**

I used GenAI primarily for researching Ionic framework concepts and Angular best practices. When I was uncertain about how to structure the service layer for HTTP requests, I asked GenAI to explain the best practices for creating an Angular service that communicates with a REST API. This helped me understand how to properly use HttpClient, Observable patterns, and error handling in Angular. I also researched how to handle different API response formats, as the server sometimes returned data in arrays, objects, or nested structures. GenAI helped me understand various approaches to data mapping and type conversion, which informed my implementation of the mapping functions that convert server responses to the client-side InventoryItem model.

**Troubleshooting Coding Issues:**

Throughout development, I encountered several coding issues that I used GenAI to help troubleshoot. For instance, I faced type mismatches when mapping server responses that used snake_case (item_name, supplier_name) to my TypeScript interface that used camelCase (itemName, supplierName). I asked GenAI targeted questions about handling these naming convention differences, which led me to create a robust mapping function. I also encountered issues with form validation, particularly ensuring numeric fields (quantity, price) were properly validated. GenAI helped me understand how to implement proper validation logic that checks for required fields and ensures numeric values are non-negative. Additionally, when I had problems with async operations in Ionic (loading controllers, alerts), GenAI helped me understand the proper way to handle promises and async/await patterns in the context of Ionic components.

**Impact and Learning:**

Using GenAI for troubleshooting and research significantly accelerated my problem-solving process. Instead of spending hours searching through documentation, I could ask specific questions about the errors I encountered and receive targeted explanations. This was particularly valuable for understanding Observable patterns, error handling in HTTP requests, and Ionic component lifecycle. However, it is important to note that all actual code implementation was done by me. GenAI served as a learning and troubleshooting tool, not a code generator. I wrote all the code myself, using the knowledge and understanding gained from GenAI-assisted research and troubleshooting. The final application represents my own work and understanding of Ionic, Angular, and RESTful API integration.

---

## 4. Summary

**Total Development Time:** [Total Hours]  
**Key Achievements:**
- Successfully implemented all required features (list, search, add, update, delete)
- Created user-friendly mobile interface using Ionic components
- Integrated with RESTful API successfully
- Implemented proper validation and error handling
- Added help functionality on all pages
- Created privacy and security information page

**Technologies Used:**
- Ionic Framework
- Angular
- TypeScript
- RxJS (Observables)
- RESTful API (HTTP methods)

---

**Declaration:** I declare that this time log and contribution report accurately reflects my work on this assessment. All code was written by me, and GenAI was used only for research and troubleshooting purposes as permitted by the assessment guidelines.

**Signature:** _________________  
**Date:** _________________

