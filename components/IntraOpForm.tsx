import React, { useState } from 'react';
import { IntraOpData } from '../types';
import { Input, RadioGroup, SectionTitle } from './ui/InputFields';

interface Props {
  patientId: string;
  onSubmit: (data: IntraOpData) => void;
}

const IntraOpForm: React.FC<Props> = ({ patientId, onSubmit }) => {
  const [data, setData] = useState<IntraOpData>({
    patientId: patientId,
    date: new Date().toISOString().split('T')[0],
    mainInstrument: '',
    instrumentSettings: '',
    combinedTechnique: '',
    startTime: '',
    endTime: '',
    actualDuration: '',
    bleedingAmount: '',
    complications: '無',
    complicationDetails: '',
    nurseSignature: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="患者 ID" name="patientId" value={data.patientId} onChange={handleChange} required />
        <Input label="手術日期" name="date" type="date" value={data.date} onChange={handleChange} required />
      </div>

      <SectionTitle>A. 實際使用器械</SectionTitle>
      
      <RadioGroup
        label="主要能量器械"
        name="mainInstrument"
        value={data.mainInstrument}
        onChange={handleChange}
        options={[
          { value: 'Ligasure', label: 'Ligasure™' },
          { value: 'Harmonic', label: '超聲波刀' },
          { value: 'Laser', label: '雷射' },
          { value: 'Radiofrequency', label: '射頻' },
          { value: 'Bovie', label: '傳統電刀' },
          { value: 'Other', label: '其他' },
        ]}
      />

      <Input 
        label="型號/設定參數 (例如: 能量J、溫度、切割模式)" 
        name="instrumentSettings" 
        value={data.instrumentSettings} 
        onChange={handleChange} 
        placeholder="請填寫詳細設定..."
        required
      />

      <RadioGroup
        label="是否結合其他技術？"
        name="combinedTechnique"
        value={data.combinedTechnique}
        onChange={handleChange}
        options={[
          { value: 'None', label: '純能量器械完成' },
          { value: 'Suture', label: '結合傳統縫合 (止血/塑形)' },
          { value: 'HAL', label: '結合痔動脈結紮 (HAL)' },
          { value: 'Pexy', label: '結合黏膜固定術' },
        ]}
      />

      <SectionTitle>B. 手術量化指標</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="開始時間" name="startTime" type="time" value={data.startTime} onChange={handleChange} />
        <Input label="結束時間" name="endTime" type="time" value={data.endTime} onChange={handleChange} />
        <Input label="實際切除/操作時間 (分)" name="actualDuration" type="number" value={data.actualDuration} onChange={handleChange} />
      </div>

      <RadioGroup
        label="術中出血量"
        name="bleedingAmount"
        value={data.bleedingAmount}
        onChange={handleChange}
        options={[
          { value: '<10ml', label: '極少 (<10 mL)' },
          { value: '10-50ml', label: '少 (10-50 mL)' },
          { value: '51-100ml', label: '中 (51-100 mL)' },
          { value: '>100ml', label: '多 (>100 mL)' },
        ]}
      />

      <RadioGroup
        label="術中併發症"
        name="complications"
        value={data.complications}
        onChange={handleChange}
        options={[
          { value: '無', label: '無' },
          { value: '有', label: '有 (請下方說明)' },
        ]}
      />

      {data.complications === '有' && (
        <Input 
          label="併發症說明" 
          name="complicationDetails" 
          value={data.complicationDetails} 
          onChange={handleChange} 
          placeholder="如：難以控制的出血、意外損傷..."
        />
      )}

      <Input label="記錄護理師簽名" name="nurseSignature" value={data.nurseSignature} onChange={handleChange} required />

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        儲存術中紀錄
      </button>
    </form>
  );
};

export default IntraOpForm;