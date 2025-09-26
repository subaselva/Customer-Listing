# Customer Listing App

## Description
A simple **ASP.NET Core MVC 9** project to manage customers with **AJAX CRUD operations** and a responsive UI. This project includes:

- Add, Edit, Delete customers
- Client-side validation for Name, Email, and Phone
- Table with search, pagination, and sorting using DataTables
- Bootstrap 5 modals for Create/Edit/Delete
- Partial views for modular and reusable modals
- RESTful API endpoints using ASP.NET Core Web API
- Database integration with Entity Framework Core and SQL Server

---

## Technologies Used

### Backend
- **ASP.NET Core MVC 9** – For MVC architecture, controllers, and views.  
- **ASP.NET Core Web API** – For RESTful endpoints (`CustomersApiController`) for CRUD.  
- **Entity Framework Core (EF Core)** – ORM for database operations.  
- **SQL Server** – Relational database to store customer data.  

### Frontend
- **Razor Views (`.cshtml`)** – Dynamic HTML pages with server-side rendering.  
- **Bootstrap 5** – For responsive UI and modals.  
- **jQuery** – DOM manipulation and AJAX requests.  
- **DataTables** – Advanced table features: pagination, search, sorting, responsive.  
- **Partial Views** (`_CreateCustomerModal.cshtml`, `_EditCustomerModal.cshtml`, `_DeleteCustomerModal.cshtml`) – Separate reusable modals for Create/Edit/Delete.  

### JavaScript
- **AJAX (fetch API)** – For CRUD operations without full-page reload.  
- **Validation** – Client-side field validation for Name, Email, Phone.  
- **DataTables API** – For table initialization and reload after CRUD operations.  

Instructions to Run:
1. Extract the zip file.
2. Open the solution in Visual Studio 2022.
3. Restore NuGet packages.
   dotnet restore
4. Apply migrations using  `dotnet ef migrations add InitialCreate`
    and update database `dotnet ef database update`.
5. Run the project and navigate to `/Customers`.
---
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/a5e6c599-1bbb-40e7-97c3-e0c80e9fdcf2" />

## Installation
1. Clone the repository:

```bash
git clone https://github.com/subaselva/Customer-Listing.git
