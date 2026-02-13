import { useSelector } from "react-redux";
import Canvas from "./components/Canvas";

function App() {
  const workflow = useSelector((state) => state.workflow.workflow);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      
      
      <header className="bg-white border-b border-slate-200 shadow-sm">     {/* Header */}
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Workflow Builder
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </header>

     {/* Canvas wrapper */}
      <div className="h-[calc(100vh-73px)] p-6">        
        <div className="h-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <Canvas workflow={workflow} />
        </div>
      </div>
    </div>
  );
}

export default App;