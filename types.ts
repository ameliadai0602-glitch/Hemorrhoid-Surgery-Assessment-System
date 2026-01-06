export interface PreOpData {
  patientId: string;
  date: string;
  goligherGrade: string;
  symptoms: string[];
  hemorrhoidType: string;
  healthStatus: string;
  bleedingRisk: string;
  patientPreference: string;
  instrument: string;
  reason: string[];
  doctorSignature: string;
}

export interface IntraOpData {
  patientId: string;
  date: string;
  mainInstrument: string;
  instrumentSettings: string;
  combinedTechnique: string;
  startTime: string;
  endTime: string;
  actualDuration: string;
  bleedingAmount: string;
  complications: string;
  complicationDetails: string;
  nurseSignature: string;
}

export interface PostOpData {
  patientId: string;
  date: string;
  daysPostOp: string;
  vasRest: string;
  vasBm: string;
  painPeak: string;
  urination: string;
  woundStatus: string;
  oralPainMeds: boolean;
  oralPainMedsName: string;
  injectionPainMeds: boolean;
  injectionPainMedsName: string;
  sitzBath: boolean;
  ointment: boolean;
  educationUnderstanding: string;
  discomfort: string;
  nurseSignature: string;
}

export interface FollowUpData {
  patientId: string;
  period: string;
  bleeding: string;
  prolapse: string;
  pain: string;
  analAppearance: string;
  digitalExam: string;
  recoveryTime: string;
  defecationControl: string;
  satisfaction: string;
  rechoice: string;
  complications: string;
  nurseSignature: string;
  doctorSignature: string;
}

export type FormType = 'pre-op' | 'intra-op' | 'post-op' | 'follow-up';