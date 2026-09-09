import pandas as pd
import json

df = pd.read_csv('Employee Lifecycle Tracker - Sheet1.csv')

# Clean missing values
df["Manager's First Name"] = df["Manager's First Name"].fillna('Unassigned')
df['Position'] = df['Position'].fillna('Team Member')
df['Status'] = df['Status'].fillna('Active')
df['Hire Date'] = df['Hire Date'].fillna('')
df['Regularization Date'] = df['Regularization Date'].fillna('')

records = []
for idx, row in df.iterrows():
    records.append({
        "id": f"EMP-{idx+1:03d}",
        "name": str(row['Full Name']).strip(),
        "position": str(row['Position']).strip(),
        "account": str(row['Account']).strip() if pd.notna(row['Account']) else "Softchoice",
        "shift": str(row['Shift/Schedule']).strip() if pd.notna(row['Shift/Schedule']) else "",
        "hireDate": str(row['Hire Date']).strip(),
        "regDate": str(row['Regularization Date']).strip(),
        "email": str(row['Employee Email']).strip() if pd.notna(row['Employee Email']) else "",
        "manager": str(row["Manager's First Name"]).strip(),
        "status": str(row['Status']).strip()
    })

print(f"Total processed records: {len(records)}")
