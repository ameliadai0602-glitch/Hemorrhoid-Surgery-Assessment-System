import React, { useState } from 'react';
import PreOpForm from './components/PreOpForm';
import IntraOpForm from './components/IntraOpForm';
import PostOpForm from './components/PostOpForm';
import FollowUpForm from './components/FollowUpForm';
import { generateClinicalNote } from './services/geminiService';
import { FormType } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FormType>('pre-op');
  const [patientId, setPatientId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState('');
  const [lastSavedData, setLastSavedData] = useState<any>(null);

  // Tabs configuration
  const tabs: { id: FormType; label: string }[] = [
    { id: 'pre-op', label: '術前評估 (Pre-Op)' },
    { id: 'intra-op', label: '術中紀錄 (Intra-Op)' },
    { id: 'post-op', label: '術後/每日 (Post-Op)' },
    { id: 'follow-up', label: '門診追蹤 (Follow-up)' },
  ];

  const handleFormSubmit = async (data: any) => {
    // 1. Simulate saving to local state (for Gemini)
    setLastSavedData(data);
    setPatientId(data.patientId);
    setSummary(''); 

    // 2. Prepare for export
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${activeTab}_${data.patientId}_${new Date().toISOString().slice(0,10)}.json`;
    link.click();

    // 3. Prompt user about Google Sheets
    alert("資料已準備就緒！\n1. JSON 檔案已下載作為備份。\n2. 若需寫入 Google Sheets，請部署 Google Apps Script 並將此 JSON 發送至該端點。\n3. 現在可以點擊「AI 生成病歷摘要」來產生紀錄。");
  };

  const handleGenerateSummary = async () => {
    if (!lastSavedData) {
      alert("請先填寫並儲存表單資料。");
      return;
    }
    setIsGenerating(true);
    const text = await generateClinicalNote(activeTab, lastSavedData);
    setSummary(text);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">HemoTrack AI</h1>
            <p className="text-blue-200 text-sm mt-1">痔瘡手術能量器械選擇標準化評估系統</p>
          </div>
          <div className="hidden md:block">
            <span className="bg-blue-900 px-3 py-1 rounded text-xs text-blue-200">
              Target: Google Sheets
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSummary('');
                  setLastSavedData(null);
                }}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            {activeTab === 'pre-op' && <PreOpForm patientId={patientId} onSubmit={handleFormSubmit} />}
            {activeTab === 'intra-op' && <IntraOpForm patientId={patientId} onSubmit={handleFormSubmit} />}
            {activeTab === 'post-op' && <PostOpForm patientId={patientId} onSubmit={handleFormSubmit} />}
            {activeTab === 'follow-up' && <FollowUpForm patientId={patientId} onSubmit={handleFormSubmit} />}
          </div>

          {/* Sidebar: AI Assistant */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border border-blue-100">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <h3 className="text-lg font-medium text-gray-900">Gemini 醫療助理</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                填寫並儲存表單後，點擊下方按鈕，AI 將為您生成標準化病歷摘要或護理紀錄。
              </p>

              <button
                onClick={handleGenerateSummary}
                disabled={isGenerating || !lastSavedData}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isGenerating || !lastSavedData ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    生成中...
                  </>
                ) : 'AI 生成病歷摘要'}
              </button>

              {summary && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">生成結果：</h4>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap h-96 overflow-y-auto">
                    {summary}
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(summary)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    複製到剪貼簿
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-xs text-gray-500">
              <h4 className="font-bold mb-1">關於 Google Sheets 整合</h4>
              <p>
                本系統為前端介面。若要自動寫入您的 Google Sheet，需建立 Google Apps Script (Web App) 作為 API 端點，並在此 App 中設定 POST 請求。目前演示模式下，資料會以 JSON 檔案下載保存。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;