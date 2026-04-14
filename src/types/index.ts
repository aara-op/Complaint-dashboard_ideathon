export interface Complaint {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  channel: 'Email' | 'Phone' | 'Chat' | 'Social Media' | 'Web Portal' | 'In-Person';
  category: string;
  subcategory: string;
  product: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  sentiment: 'Very Negative' | 'Negative' | 'Neutral' | 'Positive';
  sentimentScore: number;
  status: 'New' | 'In Progress' | 'Escalated' | 'Resolved' | 'Closed';
  subject: string;
  description: string;
  keyIssues: string[];
  assignedTo: string;
  assignedTeam: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  slaStatus: 'On Track' | 'At Risk' | 'Breached';
  relatedComplaints: string[];
  communications: Communication[];
  aiSuggestedResponse: string;
  aiSuggestedActions: string[];
  rootCause: string;
  regulatoryFlag: boolean;
  escalationLevel: number;
  resolutionNotes: string;
  tags: string[];
}

export interface Communication {
  id: string;
  type: 'inbound' | 'outbound';
  channel: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
}

export interface DashboardStats {
  totalComplaints: number;
  newToday: number;
  resolved: number;
  escalated: number;
  avgResolutionTime: string;
  slaCompliance: number;
  csat: number;
}

export type PageType = 'login' | 'dashboard' | 'complaints' | 'complaint-detail' | 'analytics' | 'ai-insights' | 'escalations' | 'settings';
