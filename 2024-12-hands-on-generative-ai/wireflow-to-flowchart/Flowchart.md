```mermaid
flowchart TD
    A(Start) --> B[Login Page]
    B --> C{Login Info Correct?}
    C --Yes--> D[View Accounts]
    C --No--> E[Retry Login]
    E --> C
    
    D --> F[View Credit Card Balance]
    
    C -->|Incorrect| G{Forgot Password}
    G --Yes--> H[Password Reset]
    H --> I{Email in Database?}
    I --Yes--> J[Password Reset Email Sent]
    I --No--> K[Re-enter Email Address]
    K --> I
    
    I --No Email--> L[Registration Process]
    L --> E
```