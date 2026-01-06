import React, { useState } from 'react';
import { PreOpData } from '../types';
import { Input, RadioGroup, CheckboxGroup, SectionTitle } from './ui/InputFields';

interface Props {
  patientId: string;
  onSubmit: (data: PreOpData) => void;
}

const PreOpForm: React.FC<Props> = ({ patientId, onSubmit }) => {
  const [data, setData] = useState<PreOpData>({
    patientId: patientId,
    date: new Date().toISOString().split('T')[0],
    goligherGrade: '',
    symptoms: [],
    hemorrhoidType: '',
    healthStatus: '',
    bleedingRisk: '',
    patientPreference: '',
    instrument: '',
    reason: [],
    doctorSignature: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: 'symptoms' | 'reason', value: string, checked: boolean) => {
    setData(prev => {
      const currentList = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentList, value] };
      } else {
        return { ...prev, [field]: currentList.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="患者 ID" name="patientId" value={data.patientId} onChange={handleChange} required />
        <Input label="日期" name="date" type="date" value={data.date} onChange={handleChange} required />
      </div>

      <SectionTitle>A. 痔瘡評估 (Goligher分類)</SectionTitle>
      
      <RadioGroup
        label="主要分級"
        name="goligherGrade"
        value={data.goligherGrade}
        onChange={handleChange}
        options={[
          { value: 'I', label: 'I級：僅出血，無脫垂' },
          { value: 'II', label: 'II級：排便時脫垂，自行回納 (建議收案)' },
          { value: 'III', label: 'III級：脫垂需手動回納 (建議收案)' },
          { value: 'IV', label: 'IV級：持續性脫垂，無法回納 (建議收案)' },
        ]}
      />

      <CheckboxGroup
        label="主要症狀 (可複選)"
        options={[
          { value: '出血', label: '出血' },
          { value: '脫垂', label: '脫垂' },
          { value: '疼痛', label: '疼痛' },
          { value: '搔癢/異物感', label: '搔癢/異物感' },
        ]}
        selectedValues={data.symptoms}
        onChange={(val, checked) => handleCheckboxChange('symptoms', val, checked)}
      />

      <RadioGroup
        label="痔瘡類型"
        name="hemorrhoidType"
        value={data.hemorrhoidType}
        onChange={handleChange}
        options={[
          { value: '內痔', label: '內痔' },
          { value: '混合痔', label: '混合痔' },
          { value: '外痔皮贅為主', label: '外痔皮贅為主' },
        ]}
      />

      <SectionTitle>B. 患者因素考量</SectionTitle>
      
      <RadioGroup
        label="年齡與健康狀態"
        name="healthStatus"
        value={data.healthStatus}
        onChange={handleChange}
        options={[
          { value: '年輕健康', label: '年輕健康 (<65歲，ASA I-II級)' },
          { value: '高齡/共病多', label: '高齡/共病多 (≥65歲或ASA ≥III級)' },
        ]}
      />

      <RadioGroup
        label="出血風險"
        name="bleedingRisk"
        value={data.bleedingRisk}
        onChange={handleChange}
        options={[
          { value: '無', label: '無抗凝血劑/抗血小板藥物' },
          { value: '抗血小板藥', label: '服用抗血小板藥 (如Aspirin, Clopidogrel)' },
          { value: '抗凝血劑', label: '服用抗凝血劑 (如Warfarin, DOACs)' },
        ]}
      />

      <RadioGroup
        label="患者偏好"
        name="patientPreference"
        value={data.patientPreference}
        onChange={handleChange}
        options={[
          { value: '疼痛少', label: '最在意術後疼痛少，恢復快' },
          { value: '不復發', label: '最在意長期不復發，可忍受較多術後不適' },
          { value: '門診手術', label: '希望門診手術，當天回家' },
          { value: '無偏好', label: '無特別偏好，尊重醫師建議' },
        ]}
      />

      <SectionTitle>C. 能量器械選擇決策</SectionTitle>

      <RadioGroup
        label="預計採用主要器械"
        name="instrument"
        value={data.instrument}
        onChange={handleChange}
        options={[
          { value: '傳統電刀', label: '傳統電刀切除術 (Milligan-Morgan/Ferguson)' },
          { value: 'Ligasure', label: 'Ligasure™ 痔瘡切除術' },
          { value: 'Harmonic', label: '超聲波刀 (Harmonic®) 切除術' },
          { value: 'Laser', label: '雷射消融術' },
          { value: 'Radiofrequency', label: '射頻消融術' },
          { value: 'Other', label: '其他' },
        ]}
      />

      <CheckboxGroup
        label="選擇主要理由 (可複選)"
        options={[
          { value: '符合分級', label: '符合痔瘡分級與類型' },
          { value: '出血風險', label: '考量患者共病與用藥 (出血風險)' },
          { value: '符合期望', label: '符合患者疼痛與恢復期期望' },
          { value: '設備/熟悉度', label: '醫院設備可用性/醫師熟悉度' },
          { value: '成本', label: '成本考量' },
        ]}
        selectedValues={data.reason}
        onChange={(val, checked) => handleCheckboxChange('reason', val, checked)}
      />

      <Input label="醫師簽名" name="doctorSignature" value={data.doctorSignature} onChange={handleChange} required />

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        儲存術前評估
      </button>
    </form>
  );
};

export default PreOpForm;