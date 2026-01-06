import React, { useState } from 'react';
import { FollowUpData } from '../types';
import { Input, RadioGroup, SectionTitle } from './ui/InputFields';

interface Props {
  patientId: string;
  onSubmit: (data: FollowUpData) => void;
}

const FollowUpForm: React.FC<Props> = ({ patientId, onSubmit }) => {
  const [data, setData] = useState<FollowUpData>({
    patientId: patientId,
    period: '',
    bleeding: '',
    prolapse: '',
    pain: '',
    analAppearance: '',
    digitalExam: '',
    recoveryTime: '',
    defecationControl: '',
    satisfaction: '',
    rechoice: '',
    complications: '',
    nurseSignature: '',
    doctorSignature: ''
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">追蹤時間點</label>
          <select 
            name="period" 
            value={data.period} 
            onChange={(e: any) => handleChange(e)} 
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
            required
          >
            <option value="">請選擇</option>
            <option value="1m">1 個月</option>
            <option value="3m">3 個月</option>
            <option value="6m">6 個月</option>
            <option value="12m">12 個月</option>
            <option value="24m">24 個月</option>
          </select>
        </div>
      </div>

      <SectionTitle>A. 症狀評估 (過去一個月)</SectionTitle>

      <RadioGroup
        label="出血"
        name="bleeding"
        value={data.bleeding}
        onChange={handleChange}
        options={[
          { value: '無', label: '無' },
          { value: '偶爾', label: '偶爾 (<3次/月)' },
          { value: '經常', label: '經常 (≥1次/週)' },
        ]}
      />

      <RadioGroup
        label="脫垂感/腫塊"
        name="prolapse"
        value={data.prolapse}
        onChange={handleChange}
        options={[
          { value: '無', label: '無' },
          { value: '自行回納', label: '有，但可自行回納 (疑似復發II級)' },
          { value: '需手動', label: '有，需手動回納 (疑似復發III級)' },
        ]}
      />

      <RadioGroup
        label="疼痛/不適"
        name="pain"
        value={data.pain}
        onChange={handleChange}
        options={[
          { value: '無', label: '無' },
          { value: '輕微', label: '僅排便時輕微' },
          { value: '嚴重', label: '持續不適影響生活' },
        ]}
      />

      <SectionTitle>B. 客觀檢查 (醫師)</SectionTitle>

      <RadioGroup
        label="肛門外觀"
        name="analAppearance"
        value={data.analAppearance}
        onChange={handleChange}
        options={[
          { value: '良好', label: '傷口癒合良好' },
          { value: '皮贅', label: '殘餘皮贅' },
          { value: '狹窄', label: '肛門狹窄跡象' },
          { value: '其他', label: '其他' },
        ]}
      />

      <RadioGroup
        label="指診/肛門鏡"
        name="digitalExam"
        value={data.digitalExam}
        onChange={handleChange}
        options={[
          { value: '平滑', label: '黏膜平滑，無明顯痔核' },
          { value: '充血', label: '輕度黏膜充血/殘餘痔組織' },
          { value: '復發', label: '明確復發痔核' },
        ]}
      />

      <SectionTitle>C. 功能恢復與滿意度</SectionTitle>

      <Input label="恢復正常活動時間 (約術後幾週)" name="recoveryTime" type="number" value={data.recoveryTime} onChange={handleChange} />

      <RadioGroup
        label="排便控制"
        name="defecationControl"
        value={data.defecationControl}
        onChange={handleChange}
        options={[
          { value: '良好', label: '與術前相同或更好' },
          { value: '偶發', label: '偶有急迫感/滲漏' },
          { value: '影響', label: '明顯影響' },
        ]}
      />

      <Input label="整體滿意度 (0-10)" name="satisfaction" type="number" min="0" max="10" value={data.satisfaction} onChange={handleChange} />

      <RadioGroup
        label="是否願意再次選擇同樣手術？"
        name="rechoice"
        value={data.rechoice}
        onChange={handleChange}
        options={[
          { value: '一定會', label: '一定會' },
          { value: '可能會', label: '可能會' },
          { value: '不確定', label: '不確定' },
          { value: '可能不會', label: '可能不會' },
        ]}
      />

      <SectionTitle>D. 併發症紀錄</SectionTitle>
      <Input label="併發症 (若無填「無」)" name="complications" value={data.complications} onChange={handleChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="護理師簽名" name="nurseSignature" value={data.nurseSignature} onChange={handleChange} required />
        <Input label="醫師確認" name="doctorSignature" value={data.doctorSignature} onChange={handleChange} required />
      </div>

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        儲存追蹤紀錄
      </button>
    </form>
  );
};

export default FollowUpForm;