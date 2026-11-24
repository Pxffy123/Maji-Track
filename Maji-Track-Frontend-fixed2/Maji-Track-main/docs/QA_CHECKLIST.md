# Maji-Track Frontend QA & Testing Checklist

**QA Lead:** Lewis  
**Scope:** README, frontend testing checklist, navigation, API fetching, loading/error states, and forms

## 1. Navigation & Routing Tests
- [ ] Landing page loads correctly and displays the featured critical water shortage.
- [ ] Login and Sign Up buttons route to their respective authentication pages.
- [ ] Resident dashboard loads district views and interactive shortage filters.
- [ ] Admin dashboard displays pending/approved reports and route navigation.

## 2. API Fetching & Data Display Tests
- [ ] Shortages fetch successfully and sort by criticality.
- [ ] District filters accurately query and display local records.

## 3. Loading & Error States
- [ ] Loading spinners or skeletons appear while fetching data from the backend.
- [ ] Error messages display gracefully if network requests fail.

## 4. Forms & Validation Tests
- [ ] Resident submission forms validate required fields before sending.
- [ ] Auth forms handle incorrect inputs properly without crashing.
