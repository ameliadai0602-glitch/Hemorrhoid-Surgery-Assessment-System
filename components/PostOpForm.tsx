import React, { useState } from 'react';
import { PostOpData } from '../types';
import { Input, RadioGroup, SectionTitle } from './ui/InputFields';

interface Props {
  patientId: string;
  onSubmit: (data: PostOpData) => void;
}

const PostOpForm: React.FC<Props> = ({ patientId, onSubmit }) => {
  const [data, setData] = useState<PostOpData>({
    patientId: patientId,
    date: new Date().toISOString().split('T')[0],
    daysPostOp: '1',
    vasRest: '',
    vasBm: '',
    painPeak: '',
    urination: '',
    woundStatus: '',
    oralPainMeds: false,
    oralPainMedsName: '',
    injectionPainMeds: false,
    injectionPainMedsName: '',
    sitzBath: false,
    ointment: false,
    educationUnderstanding: '',
    discomfort: '',
    nurseSignature: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="患者 ID" name="patientId" value={data.patientId} onChange={handleChange} required />
        <Input label="評估日期" name="date" type="date" value={data.date} onChange={handleChange} required />
        <Input label="術後天數 (Day)" name="daysPostOp" type="number" value={data.daysPostOp} onChange={handleChange} required />
      </div>

      <SectionTitle>A. 生命徵象與主訴</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="靜息疼痛 (VAS 0-10)" name="vasRest" type="number" min="0" max="10" value={data.vasRest} onChange={handleChange} required />
        <Input label="排便/換藥疼痛 (VAS 0-10)" name="vasBm" type="number" min="0" max="10" value={data.vasBm} onChange={handleChange} required />
        <Input label="疼痛高峰出現時間 (術後第幾小時)" name="painPeak" value={data.painPeak} onChange={handleChange} />
      </div>

      <RadioGroup
        label="排尿情況"
        name="urination"
        value={data.urination}
        onChange={handleChange}
        options={[
          { value: '自解順暢', label: '自解順暢' },
          { value: '困難可自解', label: '困難，但可自解' },
          { value: '尿滯留', label: '尿滯留，需導尿' },
        ]}
      />

      <RadioGroup
        label="傷口/肛門情況"
        name="woundStatus"
        value={data.woundStatus}
        onChange={handleChange}
        options={[
          { value: '乾淨', label: '敷料乾淨' },
          { value: '少量滲血', label: '少量滲血' },
          { value: '活動性出血', label: '活動性出血 (需處置)' },
        ]}
      />

      <SectionTitle>B. 用藥與處置</SectionTitle>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
             <input type="checkbox" name="oralPainMeds" checked={data.oralPainMeds} onChange={handleChange} className="h-4 w-4 text-blue-600 rounded" />
             <span className="ml-2 text-sm text-gray-700">使用口服止痛藥</span>
          </label>
          {data.oralPainMeds && (
            <input 
              name="oralPainMedsName" 
              value={data.oralPainMedsName} 
              onChange={handleChange} 
              placeholder="藥名/次數" 
              className="border-b border-gray-300 focus:border-blue-500 outline-none text-sm p-1"
            />
          )}
        </div>

        <div className="flex items-center space-x-4">
           <label className="flex items-center">
             <input type="checkbox" name="injectionPainMeds" checked={data.injectionPainMeds} onChange={handleChange} className="h-4 w-4 text-blue-600 rounded" />
             <span className="ml-2 text-sm text-gray-700">使用針劑止痛藥</span>
          </label>
           {data.injectionPainMeds && (
            <input 
              name="injectionPainMedsName" 
              value={data.injectionPainMedsName} 
              onChange={handleChange} 
              placeholder="藥名/次數" 
              className="border-b border-gray-300 focus:border-blue-500 outline-none text-sm p-1"
            />
          )}
        </div>

        <div className="flex space-x-6">
           <label className="flex items-center">
             <input type="checkbox" name="sitzBath" checked={data.sitzBath} onChange={handleChange} className="h-4 w-4 text-blue-600 rounded" />
             <span className="ml-2 text-sm text-gray-700">溫水坐浴</span>
          </label>
           <label className="flex items-center">
             <input type="checkbox" name="ointment" checked={data.ointment} onChange={handleChange} className="h-4 w-4 text-blue-600 rounded" />
             <span className="ml-2 text-sm text-gray-700">局部藥膏使用</span>
          </label>
        </div>
      </div>

      <SectionTitle>C. 護理指導與反應</SectionTitle>

      <RadioGroup
        label="衛教理解度"
        name="educationUnderstanding"
        value={data.educationUnderstanding}
        onChange={handleChange}
        options={[
          { value: '完全理解', label: '完全理解' },
          { value: '部分理解', label: '部分理解，需重複說明' },
          { value: '不理解', label: '不理解/有語言障礙' },
        ]}
      />

      <RadioGroup
        label="當日主要不適"
        name="discomfort"
        value={data.discomfort}
        onChange={handleChange}
        options={[
          { value: '疼痛', label: '疼痛' },
          { value: '排尿困難', label: '排尿困難' },
          { value: '焦慮', label: '焦慮' },
          { value: '其他', label: '其他' },
        ]}
      />

      <Input label="護理師簽名" name="nurseSignature" value={data.nurseSignature} onChange={handleChange} required />

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        儲存術後評估
      </button>
    </form>
  );
};

export default PostOpForm;