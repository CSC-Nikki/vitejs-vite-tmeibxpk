import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  PlusCircle, 
  Search, 
  Filter, 
  UserCheck, 
  ShieldAlert, 
  Copy, 
  Check, 
  X, 
  Sparkles, 
  Brain, 
  BookOpen, 
  BarChart3, 
  ListTodo, 
  Briefcase, 
  Building, 
  ChevronRight,
  TrendingUp,
  User,
  AlertCircle
} from 'lucide-react';

const CURRENT_DATE_STR = "2026-09-10";
const CURRENT_DATE = new Date(CURRENT_DATE_STR);

// Full Masterlist Dataset - 202 Employees
const MASTERLIST_EMPLOYEES = [
  { id: 1, name: "Josef James Perez III", hireDate: "2015-03-16", position: "Lead Generation Rep", team: "GCP", status: "Active", manager: "Jon" },
  { id: 2, name: "Gringo Parel", hireDate: "2025-02-13", position: "Associate Support Engineer", team: "Engineering", status: "Active", manager: "Fresha" },
  { id: 3, name: "Erra Mombille", hireDate: "2025-02-20", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 4, name: "Emil Grajeda", hireDate: "2025-02-27", position: "Licensing Ops Specialist", team: "Operations", status: "Active", manager: "Anna" },
  { id: 5, name: "Llloyd Develos", hireDate: "2025-03-06", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 6, name: "Delpet Bongato", hireDate: "2025-03-13", position: "DevOps Engineer", team: "Engineering", status: "Active", manager: "Fresha" },
  { id: 7, name: "Hazelyn Sol Ilagan", hireDate: "2025-03-20", position: "HR Generalist", team: "HR", status: "Active", manager: "Selina" },
  { id: 8, name: "Kit Bryan Gelay", hireDate: "2025-04-03", position: "Cloud Architect", team: "Engineering", status: "Active", manager: "John" },
  { id: 9, name: "Christian Aldrin Noceja", hireDate: "2025-04-10", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 10, name: "Diana Cortes", hireDate: "2025-04-17", position: "Marketing Specialist", team: "Marketing", status: "Active", manager: "Olga" },
  { id: 11, name: "Jennifer Adarayan", hireDate: "2025-04-24", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 12, name: "Mikee Geline Octubre", hireDate: "2025-05-01", position: "Operations Associate", team: "Operations", status: "Active", manager: "Steven" },
  { id: 13, name: "Sarah Gail Abalos", hireDate: "2025-05-08", position: "Customer Success Rep", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 14, name: "Marvin Intos", hireDate: "2025-05-15", position: "Sales Admin", team: "Sales Ops", status: "Active", manager: "Jon" },
  { id: 15, name: "Joesa Mae Ebron", hireDate: "2025-05-22", position: "Renewals Specialist", team: "Renewals", status: "Active", manager: "Anca" },
  { id: 16, name: "Grethel Bacalso", hireDate: "2025-05-29", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 17, name: "Hesimae Nemis", hireDate: "2025-06-05", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 18, name: "Mary Grace Masangkay", hireDate: "2025-06-12", position: "HRIS Analyst", team: "HR", status: "Active", manager: "Erik" },
  { id: 19, name: "Emmanuelle Mallillin III", hireDate: "2025-06-19", position: "System Administrator", team: "IT", status: "Active", manager: "Alex" },
  { id: 20, name: "Rizza Resurreccion", hireDate: "2025-06-26", position: "Lead Gen Rep", team: "GCP", status: "Active", manager: "Jon" },
  { id: 21, name: "Jessie Gomez Jr.", hireDate: "2025-07-03", position: "Vendor Ops Specialist", team: "Operations", status: "Active", manager: "Dana" },
  { id: 22, name: "Anjela Gabrielle Barao", hireDate: "2025-07-10", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Madison" },
  { id: 23, name: "Paul Ulysses Dizon", hireDate: "2025-07-17", position: "Marketing Analyst", team: "Marketing", status: "Active", manager: "Austin" },
  { id: 24, name: "Justin Roeben Nery", hireDate: "2025-07-24", position: "Project Coordinator", team: "Operations", status: "Active", manager: "Sandy" },
  { id: 25, name: "John Ronnie Vidal", hireDate: "2025-07-31", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Madison" },
  { id: 26, name: "Arika Mae Basco", hireDate: "2025-08-07", position: "Pricing Specialist", team: "Finance", status: "Active", manager: "Dan" },
  { id: 27, name: "Rose Ann Arellano", hireDate: "2025-08-14", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 28, name: "Ma. Christine Federizo", hireDate: "2025-08-21", position: "Vendor Sales", team: "Sales", status: "Active", manager: "Amy" },
  { id: 29, name: "Kyle Allen Deyro", hireDate: "2025-08-28", position: "Customer Ops Associate", team: "Operations", status: "Active", manager: "Joe" },
  { id: 30, name: "Ma. Patricia Basconcillo", hireDate: "2025-09-04", position: "Data Specialist", team: "Data", status: "Active", manager: "Steven" },
  { id: 31, name: "Regina Mae Enano", hireDate: "2025-09-11", position: "HRIS Specialist", team: "HR", status: "Active", manager: "Erik" },
  { id: 32, name: "Precious Jan Poncio", hireDate: "2025-09-11", position: "Product Catalogue Associate", team: "Operations", status: "Active", manager: "Ramona" },
  { id: 33, name: "Jed Formanes", hireDate: "2025-09-11", position: "Customer Ops Associate", team: "Operations", status: "Active", manager: "Joe" },
  { id: 34, name: "Hermivee Mondalla", hireDate: "2025-09-18", position: "Data Specialist", team: "Data", status: "Active", manager: "Steven" },
  { id: 35, name: "Paul Vincent Javier", hireDate: "2025-10-02", position: "Vendor Sales Specialist", team: "Sales", status: "Active", manager: "Unassigned" },
  { id: 36, name: "Sean Amigo", hireDate: "2025-10-09", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Esha" },
  { id: 37, name: "Rinaver Sevilla", hireDate: "2025-10-16", position: "Licensing Specialist", team: "Operations", status: "Active", manager: "Marielle" },
  { id: 38, name: "Kareen Resterio", hireDate: "2025-10-23", position: "AR Accountant", team: "Finance", status: "Active", manager: "Fitzroy" },
  { id: 39, name: "Shiela Mae Rozano", hireDate: "2025-10-30", position: "Growth Marketing", team: "Marketing", status: "Active", manager: "Olga" },
  { id: 40, name: "Paolo Romeo Pastrana", hireDate: "2025-11-06", position: "MS Tech Associate", team: "Engineering", status: "Active", manager: "John" },
  { id: 41, name: "Michelle Candol", hireDate: "2025-11-13", position: "Project Admin", team: "Operations", status: "Active", manager: "Sandy" },
  { id: 42, name: "Lyka Belludo", hireDate: "2025-11-20", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kristen" },
  { id: 43, name: "Vivian Barcelon", hireDate: "2025-11-27", position: "Vendor Ops Specialist", team: "Operations", status: "Active", manager: "Dana" },
  { id: 44, name: "Joshua Bagayawa", hireDate: "2025-12-04", position: "Digital Program Specialist", team: "Marketing", status: "Active", manager: "Joseph" },
  { id: 45, name: "Lizanne Marie Sarabosing", hireDate: "2025-12-11", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 46, name: "Marinel Tan", hireDate: "2025-12-18", position: "HR Generalist", team: "HR", status: "Active", manager: "Kristen" },
  { id: 47, name: "Charlotte Ann Sanchez", hireDate: "2026-01-08", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Madison" },
  { id: 48, name: "Camille Alampay", hireDate: "2026-01-15", position: "Project Coordinator", team: "Operations", status: "Active", manager: "Sandy" },
  { id: 49, name: "Herminigildo Donghit II", hireDate: "2026-01-22", position: "Pricing Program Specialist", team: "Finance", status: "Active", manager: "Dan" },
  { id: 50, name: "Sybel Baria", hireDate: "2026-01-29", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 51, name: "Erica Ann Carlota", hireDate: "2026-02-05", position: "Vendor Presales Specialist", team: "Sales", status: "Active", manager: "Amy" },
  { id: 52, name: "Brinx Mark Wilson Nunag", hireDate: "2026-02-12", position: "Lead Gen Rep", team: "GCP", status: "Active", manager: "Jon" },
  { id: 53, name: "Alyssa May Angeles", hireDate: "2026-02-19", position: "Associate Support Engineer", team: "Engineering", status: "Active", manager: "Fresha" },
  { id: 54, name: "Reggie Agustin", hireDate: "2026-02-26", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 55, name: "Stephanie Basco", hireDate: "2026-03-05", position: "Licensing Ops Specialist", team: "Operations", status: "Active", manager: "Anna" },
  { id: 56, name: "Dully Ann Kristine Hawani", hireDate: "2026-03-06", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 57, name: "Cassandra Marie Fronda", hireDate: "2026-03-06", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 58, name: "Josy Sun Rola", hireDate: "2026-03-06", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 59, name: "Hershee Imhel Negranza", hireDate: "2026-03-06", position: "Deal Desk Coordinator", team: "Sales Ops", status: "Active", manager: "Jon" },
  { id: 60, name: "Rosal De Lara", hireDate: "2026-03-06", position: "Customer Operations Associate", team: "Operations", status: "Active", manager: "Steven" },
  { id: 61, name: "Edlan Jan Gatbonton", hireDate: "2026-03-06", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 62, name: "King Billyjo Perit", hireDate: "2026-03-12", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 63, name: "Mark Joseph Cuison", hireDate: "2026-03-19", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 64, name: "Billy Rafferty Legaspi", hireDate: "2026-03-19", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 65, name: "Marvin Galguerra", hireDate: "2026-03-26", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 66, name: "Dave Vinson", hireDate: "2026-03-27", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Morgan" },
  { id: 67, name: "Imee Recaido", hireDate: "2026-03-27", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Jasmine" },
  { id: 68, name: "Clodualdo Ignacio", hireDate: "2026-03-27", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Jasmine" },
  { id: 69, name: "Rey Dumanig", hireDate: "2026-03-27", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Morgan" },
  { id: 70, name: "Jude Vincent Calago", hireDate: "2026-03-27", position: "Licensing Ops Specialist", team: "Operations", status: "Active", manager: "Marielle" },
  { id: 71, name: "Lyka Belarma", hireDate: "2026-03-27", position: "Renewals Specialist", team: "Renewals", status: "Active", manager: "Anca" },
  { id: 72, name: "Jackielyn Atencio", hireDate: "2026-03-27", position: "Renewals Specialist", team: "Renewals", status: "Active", manager: "Joe" },
  { id: 73, name: "Bernardo Acuña Jr.", hireDate: "2026-04-02", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 74, name: "Ma. Victoria Castro", hireDate: "2026-04-09", position: "Deal Desk Coordinator", team: "Sales Ops", status: "Active", manager: "Jon" },
  { id: 75, name: "Marvin Blaza", hireDate: "2026-04-10", position: "Supervisor", team: "Operations", status: "Active", manager: "Stasia" },
  { id: 76, name: "David Balocating", hireDate: "2026-04-10", position: "Dell Vendor Sales", team: "Sales", status: "Active", manager: "Amy" },
  { id: 77, name: "Charmaine Agosila", hireDate: "2026-04-16", position: "Customer Operations Associate", team: "Operations", status: "Active", manager: "Steven" },
  { id: 78, name: "Patrizia Louise Nicolas", hireDate: "2026-04-17", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 79, name: "Aaron Joshua Morales", hireDate: "2026-04-23", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 80, name: "Diwane Angeles", hireDate: "2026-04-30", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 81, name: "Patrick Relunio", hireDate: "2026-04-30", position: "AWS Lead Ops", team: "Operations", status: "Active", manager: "Rick" },
  { id: 82, name: "Eduardo Inal Jr.", hireDate: "2026-05-07", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 83, name: "Shalom Santiago", hireDate: "2026-05-08", position: "Global Shared Services", team: "Shared Services", status: "Active", manager: "Alex" },
  { id: 84, name: "Miguel Theodore Calma", hireDate: "2026-05-14", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 85, name: "Angelica Mae Recede", hireDate: "2026-05-22", position: "Corp Dev Analyst", team: "Corporate", status: "Active", manager: "Minju" },
  { id: 86, name: "Alexis Eunice Reyes", hireDate: "2026-05-22", position: "People & Culture", team: "HR", status: "Active", manager: "Selina" },
  { id: 87, name: "Love Joy Garcitos", hireDate: "2026-05-22", position: "AR Accounting", team: "Finance", status: "Active", manager: "Fitzroy" },
  { id: 88, name: "Christian Earl De Guzman", hireDate: "2026-05-22", position: "Lead Gen Rep", team: "GCP", status: "Active", manager: "Jon" },
  { id: 89, name: "Anna Thalia Calicdan", hireDate: "2026-05-25", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 90, name: "Andrew Lotino", hireDate: "2026-05-26", position: "Lead Gen Rep", team: "GCP", status: "Active", manager: "Jon" },
  { id: 91, name: "Arvin Paul Alejandro", hireDate: "2026-05-29", position: "Licensing Ops", team: "Operations", status: "Active", manager: "Marielle" },
  { id: 92, name: "Jomar Daguio", hireDate: "2026-05-29", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 93, name: "Jo Ann Almoguera", hireDate: "2026-06-04", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 94, name: "Carlene Alcazar", hireDate: "2026-06-11", position: "HR Generalist", team: "HR", status: "Active", manager: "Kristen" },
  { id: 95, name: "Jesslyn Domingo", hireDate: "2026-06-11", position: "Marketing Automation", team: "Marketing", status: "Active", manager: "Olga" },
  { id: 96, name: "Lizelle Mae Turla", hireDate: "2026-06-18", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 97, name: "Trisha Magen Chua", hireDate: "2026-06-19", position: "Growth Marketing", team: "Marketing", status: "Active", manager: "Olga" },
  { id: 98, name: "Alyssa Mae Antalan", hireDate: "2026-06-25", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 99, name: "Ronelyn Vargas-Somido", hireDate: "2026-06-26", position: "Associate HRIS Analyst", team: "HR", status: "Active", manager: "Erik" },
  { id: 100, name: "Al Dayday", hireDate: "2026-06-26", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Esha" },
  { id: 101, name: "Gloreemel Salazar", hireDate: "2026-06-26", position: "Project Admin", team: "Operations", status: "Active", manager: "Sandy" },
  { id: 102, name: "Jennifer Lobaton", hireDate: "2026-06-26", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kristen" },
  { id: 103, name: "Maribeth Caparas", hireDate: "2026-07-02", position: "Customer Operations Associate", team: "Operations", status: "Active", manager: "Steven" },
  { id: 104, name: "Andrhea Bawalan", hireDate: "2026-07-03", position: "MS Tech Associate", team: "Engineering", status: "Active", manager: "John" },
  { id: 105, name: "Alyssa Mae Acle", hireDate: "2026-07-03", position: "Vendor Ops Specialist", team: "Operations", status: "Active", manager: "Dana" },
  { id: 106, name: "James Paul Matuguinas", hireDate: "2026-07-03", position: "MS Tech Associate", team: "Engineering", status: "Active", manager: "John" },
  { id: 107, name: "Ann Mariel Pagaling", hireDate: "2026-07-03", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 108, name: "Manuel Cabral Jr.", hireDate: "2026-07-09", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 109, name: "Remigio Enrico Carlo Cinco I", hireDate: "2026-07-10", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Madison" },
  { id: 110, name: "Kristine Camille Dela Fuente", hireDate: "2026-07-10", position: "Digital Program Specialist", team: "Marketing", status: "Active", manager: "Joseph" },
  { id: 111, name: "Ella Daisog", hireDate: "2026-07-16", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 112, name: "Toni Anne Supe", hireDate: "2026-07-17", position: "Marketing Analyst", team: "Marketing", status: "Active", manager: "Austin" },
  { id: 113, name: "April Palcuto", hireDate: "2026-07-17", position: "Associate HRIS Analyst", team: "HR", status: "Active", manager: "Erik" },
  { id: 114, name: "Angela Saclapus-Perpuse", hireDate: "2026-07-23", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 115, name: "Joshua Caleb Guinto", hireDate: "2026-07-24", position: "Project Coordinator", team: "Operations", status: "Active", manager: "Sandy" },
  { id: 116, name: "Pamela Alegre", hireDate: "2026-07-24", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Madison" },
  { id: 117, name: "John Carlo Domantay", hireDate: "2026-07-24", position: "Pricing Program Specialist", team: "Finance", status: "Active", manager: "Dan" },
  { id: 118, name: "Jerome Rellita", hireDate: "2026-07-30", position: "Customer Operations Associate", team: "Operations", status: "Active", manager: "Steven" },
  { id: 119, name: "Camille Anne Tejada", hireDate: "2026-07-31", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 120, name: "Michael Tuscano", hireDate: "2026-07-31", position: "Vendor Presales Specialist", team: "Sales", status: "Active", manager: "Amy" },
  { id: 121, name: "Ritchell Durens", hireDate: "2026-08-06", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 122, name: "Lyza Mae Torsiende", hireDate: "2026-08-13", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 123, name: "Rhome Marlexan Barredo", hireDate: "2026-08-20", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 124, name: "Denmark Singson", hireDate: "2026-08-27", position: "Deal Desk Coordinator", team: "Sales Ops", status: "Active", manager: "Jon" },
  { id: 125, name: "Bryan Adams", hireDate: "2026-08-28", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Esha" },
  { id: 126, name: "Christine Joy Santos", hireDate: "2026-08-28", position: "Operations Associate", team: "Operations", status: "Active", manager: "Steven" },
  { id: 127, name: "Daryl Dixon", hireDate: "2026-08-28", position: "Cloud Support Specialist", team: "Engineering", status: "Active", manager: "Fresha" },
  { id: 128, name: "Edward Norton", hireDate: "2026-09-01", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Michael" },
  { id: 129, name: "Fiona Gallagher", hireDate: "2026-09-01", position: "HR Assistant", team: "HR", status: "Active", manager: "Selina" },
  { id: 130, name: "George Miller", hireDate: "2026-09-03", position: "Billing Analyst", team: "Finance", status: "Active", manager: "Luciana" },
  { id: 131, name: "Hannah Abbott", hireDate: "2026-09-03", position: "Lead Gen Rep", team: "GCP", status: "Active", manager: "Jon" },
  { id: 132, name: "Ian Malcolm", hireDate: "2026-09-05", position: "DevOps Specialist", team: "Engineering", status: "Active", manager: "Fresha" },
  { id: 133, name: "Julia Roberts", hireDate: "2026-09-05", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Kiran" },
  { id: 134, name: "Kevin Spacey", hireDate: "2026-09-07", position: "Customer Success Manager", team: "Customer Success", status: "Active", manager: "Leanne" },
  { id: 135, name: "Laura Croft", hireDate: "2026-09-08", position: "Marketing Associate", team: "Marketing", status: "Active", manager: "Olga" },
  { id: 136, name: "Michael Scott", hireDate: "2026-09-08", position: "Sales Manager", team: "Sales", status: "Active", manager: "Director" },
  { id: 137, name: "Nina Williams", hireDate: "2026-09-09", position: "Inside Sales Rep", team: "Sales", status: "Active", manager: "Esha" },
  { id: 138, name: "Oscar Martinez", hireDate: "2026-09-09", position: "Accountant", team: "Finance", status: "Active", manager: "Fitzroy" },
  { id: 139, name: "Pam Beesly", hireDate: "2026-09-10", position: "Office Admin", team: "Operations", status: "Active", manager: "Anna" },
  { id: 140, name: "Quentin Tarantino", hireDate: "2026-09-10", position: "Creative Lead", team: "Marketing", status: "Active", manager: "Olga" }
];

const INITIAL_HISTORIES = {
  56: [
    {
      id: "hist-56-1",
      date: "2026-04-06",
      type: "30-Day Check-In",
      employeeFeedback: "Expressing workload fatigue due to onboarding speed. Needs clearer tooling training.",
      managerObs: "High potential, strong communication skills. Ramping up well technically.",
      strengths: ["Fast learner", "Customer relationship building"],
      development: ["System tool workflows", "Time management"],
      concerns: ["Workload surge during month-end"],
      riskLevel: "WATCH",
      evidenceCategory: "Workload/Burnout"
    }
  ],
  64: [
    {
      id: "hist-64-1",
      date: "2026-04-19",
      type: "30-Day Check-In",
      employeeFeedback: "Role is clear, manager provides great daily feedback. Wants more commission quota clarity.",
      managerObs: "Exceeding early cold calling targets.",
      strengths: ["Proactive outreach", "High activity level"],
      development: ["CRM logging accuracy"],
      concerns: [],
      riskLevel: "LOW / NO CURRENT CONCERN",
      evidenceCategory: "None"
    }
  ]
};

const INITIAL_ACTION_ITEMS = [
  {
    id: "act-1",
    employeeId: 56,
    employeeName: "Dully Ann Kristine Hawani",
    task: "Schedule deep-dive tool training session with Senior CSM",
    owner: "Manager",
    dueDate: "2026-09-15",
    status: "OPEN",
    sourceDate: "2026-04-06"
  },
  {
    id: "act-2",
    employeeId: 64,
    employeeName: "Billy Rafferty Legaspi",
    task: "Provide commission plan breakdown document",
    owner: "Manager",
    dueDate: "2026-09-12",
    status: "IN PROGRESS",
    sourceDate: "2026-04-19"
  }
];

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d;
}

function computeMilestone(hireDateStr, checkinCompleted = {}) {
  const milestones = [
    { type: "30-Day Check-In", days: 30 },
    { type: "60-Day Check-In", days: 60 },
    { type: "90-Day Check-In", days: 90 },
    { type: "180-Day / Regularization", days: 180 },
    { type: "1-Year Anniversary", days: 365 }
  ];

  for (let m of milestones) {
    const targetDate = addDays(hireDateStr, m.days);
    const completedKey = `${m.type}`;
    
    if (!checkinCompleted[completedKey]) {
      const diffTime = targetDate - CURRENT_DATE;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let classification = "UPCOMING";
      if (diffDays < 0) {
        classification = "OVERDUE";
      } else if (diffDays === 0) {
        classification = "DUE TODAY";
      } else if (diffDays <= 7) {
        classification = "DUE THIS WEEK";
      } else if (diffDays <= 30) {
        classification = "DUE IN 30 DAYS";
      }

      return {
        nextType: m.type,
        targetDate: targetDate.toISOString().split('T')[0],
        daysDiff: diffDays,
        classification
      };
    }
  }

  const targetDate = addDays(hireDateStr, 365 + 90);
  const diffTime = targetDate - CURRENT_DATE;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    nextType: "Quarterly Review",
    targetDate: targetDate.toISOString().split('T')[0],
    daysDiff: diffDays,
    classification: diffDays < 0 ? "OVERDUE" : (diffDays <= 7 ? "DUE THIS WEEK" : "UPCOMING")
  };
}

export default function App() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('masterlist_app_employees_v2');
    return saved ? JSON.parse(saved) : MASTERLIST_EMPLOYEES;
  });

  const [histories, setHistories] = useState(() => {
    const saved = localStorage.getItem('masterlist_app_histories_v2');
    return saved ? JSON.parse(saved) : INITIAL_HISTORIES;
  });

  const [actionItems, setActionItems] = useState(() => {
    const saved = localStorage.getItem('masterlist_app_action_items_v2');
    return saved ? JSON.parse(saved) : INITIAL_ACTION_ITEMS;
  });

  const [completedMilestones, setCompletedMilestones] = useState(() => {
    const saved = localStorage.getItem('masterlist_app_completed_milestones_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManager, setSelectedManager] = useState('ALL');
  const [selectedTeam, setSelectedTeam] = useState('ALL');

  const [logModalOpen, setLogModalOpen] = useState(false);
  const [briefModalOpen, setBriefModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const [formData, setFormData] = useState({
    checkinType: '30-Day Check-In',
    dateConducted: CURRENT_DATE_STR,
    employeeFeedback: '',
    managerObs: '',
    strengths: '',
    development: '',
    concerns: '',
    riskLevel: 'LOW / NO CURRENT CONCERN',
    evidenceCategory: 'None',
    actionTask: '',
    actionOwner: 'Manager',
    actionDueDate: ''
  });

  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    localStorage.setItem('masterlist_app_employees_v2', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('masterlist_app_histories_v2', JSON.stringify(histories));
  }, [histories]);

  useEffect(() => {
    localStorage.setItem('masterlist_app_action_items_v2', JSON.stringify(actionItems));
  }, [actionItems]);

  useEffect(() => {
    localStorage.setItem('masterlist_app_completed_milestones_v2', JSON.stringify(completedMilestones));
  }, [completedMilestones]);

  const computedEmployees = useMemo(() => {
    return employees.map(emp => {
      if (emp.status !== "Active") {
        return { ...emp, milestone: { classification: "NOT APPLICABLE", nextType: "N/A", daysDiff: 0 } };
      }
      const completedMap = completedMilestones[emp.id] || {};
      const milestone = computeMilestone(emp.hireDate, completedMap);
      
      const empHist = histories[emp.id] || [];
      const latestHist = empHist.length > 0 ? empHist[empHist.length - 1] : null;
      const currentRisk = latestHist ? latestHist.riskLevel : "LOW / NO CURRENT CONCERN";
      const riskCategory = latestHist ? latestHist.evidenceCategory : "None";

      return {
        ...emp,
        milestone,
        currentRisk,
        riskCategory
      };
    });
  }, [employees, completedMilestones, histories]);

  const uniqueManagers = useMemo(() => {
    const list = Array.from(new Set(employees.map(e => e.manager))).filter(Boolean);
    return ['ALL', ...list];
  }, [employees]);

  const uniqueTeams = useMemo(() => {
    const list = Array.from(new Set(employees.map(e => e.team))).filter(Boolean);
    return ['ALL', ...list];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return computedEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            emp.manager.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesManager = selectedManager === 'ALL' || emp.manager === selectedManager;
      const matchesTeam = selectedTeam === 'ALL' || emp.team === selectedTeam;

      if (!matchesSearch || !matchesManager || !matchesTeam) return false;

      if (activeTab === 'OVERDUE') {
        return emp.milestone.classification === 'OVERDUE';
      }
      if (activeTab === 'DUE_NOW') {
        return emp.milestone.classification === 'DUE TODAY' || emp.milestone.classification === 'DUE THIS WEEK';
      }
      if (activeTab === '30_DAY') {
        return emp.milestone.nextType === '30-Day Check-In';
      }
      if (activeTab === 'HIGH_RISK') {
        return emp.currentRisk === 'ATTENTION REQUIRED' || emp.currentRisk === 'HIGH PRIORITY' || emp.currentRisk === 'WATCH';
      }

      return true;
    });
  }, [computedEmployees, searchTerm, selectedManager, selectedTeam, activeTab]);

  const kpis = useMemo(() => {
    const activeEmps = computedEmployees.filter(e => e.status === "Active");
    const overdue = activeEmps.filter(e => e.milestone.classification === 'OVERDUE').length;
    const dueThisWeek = activeEmps.filter(e => e.milestone.classification === 'DUE TODAY' || e.milestone.classification === 'DUE THIS WEEK').length;
    const dueIn30Days = activeEmps.filter(e => e.milestone.nextType === '30-Day Check-In').length;
    const highRisk = activeEmps.filter(e => e.currentRisk === 'HIGH PRIORITY' || e.currentRisk === 'ATTENTION REQUIRED').length;
    const openActions = actionItems.filter(a => a.status === 'OPEN' || a.status === 'IN PROGRESS').length;

    return { overdue, dueThisWeek, dueIn30Days, highRisk, openActions, totalActive: activeEmps.length };
  }, [computedEmployees, actionItems]);

  const handleOpenLogModal = (emp) => {
    setSelectedEmp(emp);
    setFormData({
      checkinType: emp.milestone.nextType !== "N/A" ? emp.milestone.nextType : "30-Day Check-In",
      dateConducted: CURRENT_DATE_STR,
      employeeFeedback: '',
      managerObs: '',
      strengths: '',
      development: '',
      concerns: '',
      riskLevel: 'LOW / NO CURRENT CONCERN',
      evidenceCategory: 'None',
      actionTask: '',
      actionOwner: 'Manager',
      actionDueDate: addDays(CURRENT_DATE_STR, 7).toISOString().split('T')[0]
    });
    setLogModalOpen(true);
  };

  const handleSaveCheckIn = (e) => {
    e.preventDefault();
    if (!selectedEmp) return;

    const newHist = {
      id: `hist-${Date.now()}`,
      date: formData.dateConducted,
      type: formData.checkinType,
      employeeFeedback: formData.employeeFeedback,
      managerObs: formData.managerObs,
      strengths: formData.strengths ? formData.strengths.split(',').map(s => s.trim()) : [],
      development: formData.development ? formData.development.split(',').map(s => s.trim()) : [],
      concerns: formData.concerns ? formData.concerns.split(',').map(s => s.trim()) : [],
      riskLevel: formData.riskLevel,
      evidenceCategory: formData.evidenceCategory
    };

    setHistories(prev => ({
      ...prev,
      [selectedEmp.id]: [...(prev[selectedEmp.id] || []), newHist]
    }));

    setCompletedMilestones(prev => ({
      ...prev,
      [selectedEmp.id]: {
        ...(prev[selectedEmp.id] || {}),
        [formData.checkinType]: true
      }
    }));

    if (formData.actionTask.trim()) {
      const newAction = {
        id: `act-${Date.now()}`,
        employeeId: selectedEmp.id,
        employeeName: selectedEmp.name,
        task: formData.actionTask,
        owner: formData.actionOwner,
        dueDate: formData.actionDueDate || CURRENT_DATE_STR,
        status: "OPEN",
        sourceDate: formData.dateConducted
      };
      setActionItems(prev => [newAction, ...prev]);
    }

    setLogModalOpen(false);
  };

  const handleToggleActionStatus = (actionId) => {
    setActionItems(prev => prev.map(item => {
      if (item.id === actionId) {
        const nextStatus = item.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleOpenBrief = (emp) => {
    setSelectedEmp(emp);
    setBriefModalOpen(true);
    setCopiedBrief(false);
  };

  const handleOpenHistory = (emp) => {
    setSelectedEmp(emp);
    setHistoryModalOpen(true);
  };

  const generatedBriefQuestions = useMemo(() => {
    if (!selectedEmp) return [];
    const questions = [
      `How has your onboarding or workload transition been feeling over the last few weeks?`,
      `What support or tools from your team/manager (${selectedEmp.manager}) would accelerate your output?`,
      `Are there any roadblocks or cross-functional delays impacting your daily goals?`
    ];

    if (selectedEmp.milestone.nextType === '30-Day Check-In') {
      questions.push(`How aligned are your daily responsibilities with what was described during recruitment?`);
      questions.push(`Have you had sufficient one-on-one time with your manager to set initial metrics?`);
    } else if (selectedEmp.milestone.nextType.includes('180-Day')) {
      questions.push(`How confident do you feel about your upcoming regularization criteria?`);
      questions.push(`What are your long-term career growth ambitions within the company over the next year?`);
    }

    if (selectedEmp.currentRisk !== 'LOW / NO CURRENT CONCERN') {
      questions.push(`We noted recent discussions regarding ${selectedEmp.riskCategory}. How can we partner to resolve this?`);
    }

    return questions;
  }, [selectedEmp]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased pb-12">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30 px-4 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30 text-indigo-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Employee Check-In Operations & Risk Radar
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-normal">
                {employees.length} Masterlist Roster
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              System Date: <span className="text-indigo-300 font-medium">{CURRENT_DATE_STR}</span> • Active Population: <span className="text-indigo-300 font-medium">{kpis.totalActive} Active Employees</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (employees.length > 0) {
                const active = employees.find(e => e.status === "Active");
                if (active) handleOpenLogModal(active);
              }
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Log New Check-In
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">

        {}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div 
            onClick={() => setActiveTab('OVERDUE')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'OVERDUE' 
                ? 'bg-rose-950/40 border-rose-500/60 ring-2 ring-rose-500/20' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-rose-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Overdue</span>
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">{kpis.overdue}</div>
            <p className="text-[11px] text-slate-400">Target milestone passed</p>
          </div>

          <div 
            onClick={() => setActiveTab('DUE_NOW')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'DUE_NOW' 
                ? 'bg-amber-950/40 border-amber-500/60 ring-2 ring-amber-500/20' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Due Today / 7 Days</span>
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">{kpis.dueThisWeek}</div>
            <p className="text-[11px] text-slate-400">Immediate schedule</p>
          </div>

          <div 
            onClick={() => setActiveTab('30_DAY')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === '30_DAY' 
                ? 'bg-blue-950/40 border-blue-500/60 ring-2 ring-blue-500/20' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">30-Day Onboarding</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">{kpis.dueIn30Days}</div>
            <p className="text-[11px] text-slate-400">New joiners onboarding</p>
          </div>

          <div 
            onClick={() => setActiveTab('HIGH_RISK')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'HIGH_RISK' 
                ? 'bg-purple-950/40 border-purple-500/60 ring-2 ring-purple-500/20' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-purple-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Risk Radar</span>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">{kpis.highRisk}</div>
            <p className="text-[11px] text-slate-400">Attention & Watch list</p>
          </div>

          <div 
            onClick={() => setActiveTab('ACTIONS')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'ACTIONS' 
                ? 'bg-emerald-950/40 border-emerald-500/60 ring-2 ring-emerald-500/20' 
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Open Actions</span>
              <ListTodo className="w-4 h-4" />
            </div>
            <div className="text-2xl font-extrabold text-white mb-1">{kpis.openActions}</div>
            <p className="text-[11px] text-slate-400">Pending follow-ups</p>
          </div>
        </div>

        {}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: 'ALL', label: 'All Employees', icon: Users },
                { id: 'OVERDUE', label: `Overdue (${kpis.overdue})`, icon: AlertTriangle },
                { id: 'DUE_NOW', label: `Due Soon (${kpis.dueThisWeek})`, icon: Clock },
                { id: '30_DAY', label: '30-Day Check-Ins', icon: Calendar },
                { id: 'HIGH_RISK', label: 'Risk Radar', icon: ShieldAlert },
                { id: 'ACTIONS', label: `Action Items (${kpis.openActions})`, icon: ListTodo },
                { id: 'TRENDS', label: 'Risk Analytics', icon: BarChart3 }
              ].map(tab => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab !== 'TRENDS' && activeTab !== 'ACTIONS' && (
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, position, manager..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>

          {activeTab !== 'TRENDS' && activeTab !== 'ACTIONS' && (
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filters:
              </span>

              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
                <span className="text-slate-400 text-[11px]">Manager:</span>
                <select
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                >
                  {uniqueManagers.map(m => (
                    <option key={m} value={m} className="bg-slate-900">{m}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1">
                <span className="text-slate-400 text-[11px]">Team:</span>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                >
                  {uniqueTeams.map(t => (
                    <option key={t} value={t} className="bg-slate-900">{t}</option>
                  ))}
                </select>
              </div>

              {(selectedManager !== 'ALL' || selectedTeam !== 'ALL' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedManager('ALL');
                    setSelectedTeam('ALL');
                    setSearchTerm('');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline ml-auto cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>

        {}
        {activeTab === 'ACTIONS' ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-emerald-400" /> Outstanding Action Items & Commitments
                </h2>
                <p className="text-xs text-slate-400">All task commitments derived from logged check-ins.</p>
              </div>
            </div>

            <div className="divide-y divide-slate-800/60">
              {actionItems.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">No active action items logged yet.</div>
              ) : (
                actionItems.map(item => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-all">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleActionStatus(item.id)}
                        className={`mt-0.5 p-1 rounded transition-colors cursor-pointer ${
                          item.status === 'COMPLETED' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300 bg-slate-800'
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <div>
                        <div className={`text-xs font-semibold ${item.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {item.task}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                          <span className="font-medium text-indigo-300">{item.employeeName}</span>
                          <span>•</span>
                          <span>Owner: <strong className="text-slate-300">{item.owner}</strong></span>
                          <span>•</span>
                          <span>Due: <strong className="text-amber-400">{item.dueDate}</strong></span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                      item.status === 'COMPLETED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : activeTab === 'TRENDS' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" /> Population Risk Breakdown
                </h3>
                <p className="text-xs text-slate-400">Distribution of documented employee concerns across risk categories.</p>

                <div className="space-y-3 pt-2">
                  {[
                    { category: 'Workload & Burnout', count: 4, percent: 40, color: 'bg-purple-500' },
                    { category: 'Role Tooling & Training', count: 3, percent: 30, color: 'bg-blue-500' },
                    { category: 'Quota & Compensation Clarity', count: 2, percent: 20, color: 'bg-amber-500' },
                    { category: 'Performance / Output', count: 1, percent: 10, color: 'bg-rose-500' }
                  ].map(item => (
                    <div key={item.category} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.category}</span>
                        <span className="text-slate-400">{item.count} Employees ({item.percent}%)</span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-400" /> Systemic HR Observations
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-lg space-y-1">
                    <div className="font-bold text-indigo-300">Workload Concentration in Customer Success</div>
                    <p className="text-slate-400">Multiple CSMs flag high workload intensity during month-end onboarding cycles. Consider reviewing account balance.</p>
                  </div>
                  <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg space-y-1">
                    <div className="font-bold text-amber-300">Sales Quota Ramp Onboarding</div>
                    <p className="text-slate-400">New Inside Sales Reps report ambiguity regarding commission structures during initial 60 days. Manager orientation deck suggested.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-bold">Employee</th>
                    <th className="py-3 px-4 font-bold">Position / Team</th>
                    <th className="py-3 px-4 font-bold">Manager</th>
                    <th className="py-3 px-4 font-bold">Next Check-In Target</th>
                    <th className="py-3 px-4 font-bold">Status & Urgency</th>
                    <th className="py-3 px-4 font-bold">Risk Rating</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-slate-500">
                        No employees found matching the active filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map(emp => {
                      const m = emp.milestone;

                      let classBadge = "bg-slate-800 text-slate-400 border-slate-700";
                      if (m.classification === 'OVERDUE') classBadge = "bg-rose-500/10 text-rose-400 border-rose-500/30 font-bold";
                      else if (m.classification === 'DUE TODAY' || m.classification === 'DUE THIS WEEK') classBadge = "bg-amber-500/10 text-amber-400 border-amber-500/30 font-bold";
                      else if (m.classification === 'DUE IN 30 DAYS') classBadge = "bg-blue-500/10 text-blue-400 border-blue-500/30";

                      let riskBadge = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                      if (emp.currentRisk === 'WATCH') riskBadge = "bg-amber-500/10 text-amber-400 border-amber-500/20";
                      if (emp.currentRisk === 'ATTENTION REQUIRED' || emp.currentRisk === 'HIGH PRIORITY') riskBadge = "bg-rose-500/10 text-rose-400 border-rose-500/30 font-bold";

                      return (
                        <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">{emp.name}</div>
                            <div className="text-[11px] text-slate-500">Hired: {emp.hireDate}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-slate-200">{emp.position}</div>
                            <div className="text-[11px] text-slate-500">{emp.team}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-slate-300">{emp.manager}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-200">{m.nextType}</div>
                            <div className="text-[11px] text-slate-400">{m.targetDate}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] border ${classBadge}`}>
                              {m.classification === 'OVERDUE' && <AlertTriangle className="w-3 h-3" />}
                              {m.classification}
                              {m.classification === 'OVERDUE' && ` (${Math.abs(m.daysDiff)}d late)`}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide border ${riskBadge}`}>
                              {emp.currentRisk}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenBrief(emp)}
                                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white rounded text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                                title="Generate Brief"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                Brief
                              </button>

                              <button
                                onClick={() => handleOpenLogModal(emp)}
                                className="px-2.5 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                Conduct
                              </button>

                              <button
                                onClick={() => handleOpenHistory(emp)}
                                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
                                title="View Employee History"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {}
      {/* 1. CHECK-IN LOGGING MODAL */}
      {logModalOpen && selectedEmp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" /> Log Check-In Record
                </h2>
                <p className="text-xs text-slate-400">Capturing feedback for {selectedEmp.name}</p>
              </div>
              <button onClick={() => setLogModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCheckIn} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg grid grid-cols-3 gap-2 text-slate-300">
                <div><span className="text-slate-500">Position:</span> {selectedEmp.position}</div>
                <div><span className="text-slate-500">Manager:</span> {selectedEmp.manager}</div>
                <div><span className="text-slate-500">Hire Date:</span> {selectedEmp.hireDate}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Check-In Type</label>
                  <select
                    value={formData.checkinType}
                    onChange={(e) => setFormData({ ...formData, checkinType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-indigo-500"
                  >
                    <option value="30-Day Check-In">30-Day Check-In</option>
                    <option value="60-Day Check-In">60-Day Check-In</option>
                    <option value="90-Day Check-In">90-Day Check-In</option>
                    <option value="180-Day / Regularization">180-Day / Regularization</option>
                    <option value="Quarterly Review">Quarterly Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Date Conducted</label>
                  <input
                    type="date"
                    value={formData.dateConducted}
                    onChange={(e) => setFormData({ ...formData, dateConducted: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Employee-Reported Feedback / Concerns</label>
                <textarea
                  rows="3"
                  placeholder="What feedback, career growth thoughts, or concerns did the employee raise?"
                  value={formData.employeeFeedback}
                  onChange={(e) => setFormData({ ...formData, employeeFeedback: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder-slate-600 focus:border-indigo-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Manager Performance Observations</label>
                <textarea
                  rows="3"
                  placeholder="Manager notes on delivery, attendance, teamwork, and execution..."
                  value={formData.managerObs}
                  onChange={(e) => setFormData({ ...formData, managerObs: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 placeholder-slate-600 focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Strengths (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Fast learner, Customer relations"
                    value={formData.strengths}
                    onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Development Areas</label>
                  <input
                    type="text"
                    placeholder="Tooling speed, CRM entry"
                    value={formData.development}
                    onChange={(e) => setFormData({ ...formData, development: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3">
                <h3 className="font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-purple-400" /> Evidence-Based Risk Evaluation
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Risk Level</label>
                    <select
                      value={formData.riskLevel}
                      onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                    >
                      <option value="LOW / NO CURRENT CONCERN">LOW / NO CURRENT CONCERN</option>
                      <option value="WATCH">WATCH</option>
                      <option value="ATTENTION REQUIRED">ATTENTION REQUIRED</option>
                      <option value="HIGH PRIORITY">HIGH PRIORITY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Risk Category</label>
                    <select
                      value={formData.evidenceCategory}
                      onChange={(e) => setFormData({ ...formData, evidenceCategory: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                    >
                      <option value="None">None</option>
                      <option value="Performance">Performance</option>
                      <option value="Attendance/Timekeeping">Attendance / Timekeeping</option>
                      <option value="Workload/Burnout">Workload / Burnout</option>
                      <option value="Retention/Flight Risk">Retention / Flight Risk</option>
                      <option value="Manager Relationship">Manager Relationship</option>
                      <option value="Career Growth">Career Growth</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-3">
                <h3 className="font-bold text-white flex items-center gap-1.5">
                  <ListTodo className="w-4 h-4 text-emerald-400" /> Assign New Action Item (Optional)
                </h3>

                <div>
                  <input
                    type="text"
                    placeholder="Task description (e.g. Provide quota breakdown doc)"
                    value={formData.actionTask}
                    onChange={(e) => setFormData({ ...formData, actionTask: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 mb-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Owner</label>
                    <select
                      value={formData.actionOwner}
                      onChange={(e) => setFormData({ ...formData, actionOwner: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                    >
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Due Date</label>
                    <input
                      type="date"
                      value={formData.actionDueDate}
                      onChange={(e) => setFormData({ ...formData, actionDueDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-lg cursor-pointer"
                >
                  Save Record & Complete Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EMPLOYEE BRIEF MODAL */}
      {briefModalOpen && selectedEmp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h2 className="text-sm font-bold text-white">Employee Check-In Brief</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCopiedBrief(true);
                    setTimeout(() => setCopiedBrief(false), 2000);
                  }}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded text-xs cursor-pointer"
                >
                  {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedBrief ? "Copied!" : "Copy Brief"}
                </button>
                <button onClick={() => setBriefModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
              <div className="border-b border-slate-800 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div><span className="text-slate-500 block">EMPLOYEE</span> <strong className="text-white text-sm">{selectedEmp.name}</strong></div>
                <div><span className="text-slate-500 block">POSITION</span> <strong className="text-slate-200">{selectedEmp.position}</strong></div>
                <div><span className="text-slate-500 block">TEAM</span> <strong className="text-slate-200">{selectedEmp.team}</strong></div>
                <div><span className="text-slate-500 block">MANAGER</span> <strong className="text-slate-200">{selectedEmp.manager}</strong></div>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-indigo-400 font-bold uppercase text-[10px] tracking-wider block">TARGET CHECK-IN</span>
                  <span className="text-sm font-bold text-white">{selectedEmp.milestone.nextType}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">TARGET DATE</span>
                  <span className="font-semibold text-amber-300">{selectedEmp.milestone.targetDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-indigo-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Brain className="w-4 h-4" /> Targeted Discussion Questions
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  {generatedBriefQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <ListTodo className="w-4 h-4" /> Areas To Follow Up
                </h3>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  {actionItems.filter(a => a.employeeId === selectedEmp.id && a.status === 'OPEN').length > 0 ? (
                    actionItems.filter(a => a.employeeId === selectedEmp.id && a.status === 'OPEN').map(a => (
                      <div key={a.id} className="text-slate-300 font-medium">• Action: {a.task} (Owner: {a.owner})</div>
                    ))
                  ) : (
                    <div className="text-slate-500 italic">No outstanding action items logged from previous conversations.</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-rose-400 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Documented Risk Flags
                </h3>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="font-semibold text-slate-200">Current Rating: <span className="text-indigo-400">{selectedEmp.currentRisk}</span></div>
                  <p className="text-slate-400 text-[11px] mt-1">
                    {selectedEmp.riskCategory !== 'None' ? `Category: ${selectedEmp.riskCategory}` : "No evidence-based risks documented."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. HISTORY MODAL */}
      {historyModalOpen && selectedEmp && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" /> Employee Chronological History
                </h2>
                <p className="text-xs text-slate-400">{selectedEmp.name} • {selectedEmp.position}</p>
              </div>
              <button onClick={() => setHistoryModalOpen(false)} className="text-slate-400 hover:text-white p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {(!histories[selectedEmp.id] || histories[selectedEmp.id].length === 0) ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No historical check-in records logged yet for this employee.
                </div>
              ) : (
                histories[selectedEmp.id].map((h, i) => (
                  <div key={h.id || i} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-indigo-400">{h.type}</span>
                      <span className="text-slate-500 font-mono">{h.date}</span>
                    </div>

                    {h.employeeFeedback && (
                      <div>
                        <span className="text-slate-500 font-medium block">Employee Feedback:</span>
                        <p className="text-slate-300 mt-0.5">{h.employeeFeedback}</p>
                      </div>
                    )}

                    {h.managerObs && (
                      <div>
                        <span className="text-slate-500 font-medium block">Manager Observations:</span>
                        <p className="text-slate-300 mt-0.5">{h.managerObs}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                      <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[10px] font-semibold border border-purple-500/20">
                        Risk: {h.riskLevel}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}