
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Loader2 } from 'lucide-react';

const Index = () => {
  const [date, setDate] = useState('');
  const [turno, setTurno] = useState('');
  const [zone, setZone] = useState('');
  const [sector, setSector] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<{incident: string, probability: number}> | null>(null);

  const handleConsultar = async () => {
    if (!date || !turno || !zone || !sector) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with loading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock data for demonstration
    const mockResults = [
      { incident: 'Robo', probability: 72 },
      { incident: 'Accidente de tráfico', probability: 55 },
      { incident: 'Vandalismo', probability: 40 },
      { incident: 'Incendio', probability: 29 },
      { incident: 'Agresión', probability: 21 }
    ];
    
    setResults(mockResults);
    setIsLoading(false);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'bg-red-500';
    if (probability >= 50) return 'bg-orange-500';
    if (probability >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex">
      {/* Left Column - Branding */}
      <div className="w-1/3 flex flex-col justify-center items-center p-8 border-r border-slate-700">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold text-white">
              ALERTA<span className="text-orange-500">5</span>
            </h1>
          </div>
          
          <p className="text-slate-300 text-lg leading-relaxed max-w-sm">
            Anticípate a lo inesperado. Alerta 5 te ayuda a conocer qué incidentes podrían ocurrir en tu zona antes de que sucedan. Informa, decide y actúa con datos.
          </p>
        </div>
      </div>

      {/* Right Column - Form and Results */}
      <div className="w-2/3 p-8 flex flex-col justify-center">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            {/* Form Inputs Row */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-slate-300 font-medium">Fecha:</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white focus:border-blue-400"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-slate-300 font-medium">Turno:</label>
                <Select value={turno} onValueChange={setTurno}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-400">
                    <SelectValue placeholder="Seleccionar turno" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="mañana">Mañana</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noche">Noche</SelectItem>
                    <SelectItem value="madrugada">Madrugada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-slate-300 font-medium">Zona:</label>
                <Select value={zone} onValueChange={setZone}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-400">
                    <SelectValue placeholder="Seleccionar zona" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="norte">Norte</SelectItem>
                    <SelectItem value="sur">Sur</SelectItem>
                    <SelectItem value="este">Este</SelectItem>
                    <SelectItem value="oeste">Oeste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-slate-300 font-medium">Sector:</label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-400">
                    <SelectValue placeholder="Seleccionar sector" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="comercial">Comercial</SelectItem>
                    <SelectItem value="residencial">Residencial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="turistico">Turístico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Query Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleConsultar}
                disabled={!date || !turno || !zone || !sector || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold min-w-[200px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Consultando...
                  </>
                ) : (
                  'Consultar'
                )}
              </Button>
            </div>

            {/* Results Table */}
            {results && (
              <div className="space-y-4 animate-fade-in transition-all duration-500 ease-in-out">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-xl font-semibold text-white">Incidentes más probables:</h3>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out">
                  <table className="w-full">
                    <thead className="bg-slate-800">
                      <tr>
                        <th className="text-left py-4 px-6 text-slate-300 font-semibold">Tipo de Incidente</th>
                        <th className="text-right py-4 px-6 text-slate-300 font-semibold">Probabilidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-t border-slate-700 hover:bg-slate-800/30 transition-colors duration-200">
                          <td className="py-4 px-6 text-white font-medium">{result.incident}</td>
                          <td className="py-4 px-6 text-right">
                            <Badge className={`${getProbabilityColor(result.probability)} text-white font-bold px-3 py-1`}>
                              {result.probability}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
