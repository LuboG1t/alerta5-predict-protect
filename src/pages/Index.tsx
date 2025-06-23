
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, AlertTriangle, Loader2, MessageSquare } from 'lucide-react';

const Index = () => {
  const [date, setDate] = useState('');
  const [turno, setTurno] = useState('');
  const [zone, setZone] = useState('');
  const [sector, setSector] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Array<{incident: string, probability: number}> | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'coincidio' | 'no-coincidio' | null>(null);
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([]);
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Lista completa de tipos de incidentes
  const allIncidentTypes = [
    'Robo', 'Accidente de tráfico', 'Vandalismo', 'Incendio', 'Agresión',
    'Estafa', 'Violencia doméstica', 'Disturbios', 'Tráfico de drogas',
    'Homicidio', 'Secuestro', 'Extorsión', 'Hurto', 'Violación'
  ];

  const handleConsultar = async () => {
    if (!date || !turno || !zone || !sector) {
      return;
    }
    
    setIsLoading(true);
    setShowFeedback(false);
    setFeedbackType(null);
    setSelectedIncidents([]);
    setFeedbackSent(false);
    
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
    
    // Show feedback card after results appear
    setTimeout(() => {
      setShowFeedback(true);
    }, 500);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'bg-red-500';
    if (probability >= 50) return 'bg-orange-500';
    if (probability >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleIncidentSelection = (incident: string, checked: boolean) => {
    if (checked) {
      setSelectedIncidents([...selectedIncidents, incident]);
    } else {
      setSelectedIncidents(selectedIncidents.filter(item => item !== incident));
    }
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', {
      type: feedbackType,
      selectedIncidents,
      queryData: { date, turno, zone, sector }
    });
    // Here you would send the feedback to your backend
    setFeedbackSent(true);
    setFeedbackType(null);
    setSelectedIncidents([]);
  };

  const getIncidentsForSelection = () => {
    if (feedbackType === 'coincidio') {
      return results?.map(r => r.incident) || [];
    } else {
      // Return incidents not in the predicted results
      const predictedIncidents = results?.map(r => r.incident) || [];
      return allIncidentTypes.filter(incident => !predictedIncidents.includes(incident));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex">
      {/* Left Column - Branding (Fixed) */}
      <div className="w-1/3 flex flex-col justify-center items-center p-8 border-r border-slate-700 fixed left-0 top-0 h-screen">
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

      {/* Right Column - Form and Results (Scrollable) */}
      <div className="w-2/3 ml-[33.333333%] min-h-screen overflow-y-auto">
        <div className="p-8 space-y-6">
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
                      <SelectItem value="Mañana">Mañana</SelectItem>
                      <SelectItem value="Tarde">Tarde</SelectItem>
                      <SelectItem value="Noche">Noche</SelectItem>
                      <SelectItem value="Madrugada">Madrugada</SelectItem>
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
                      <SelectItem value="Ayacucho">Ayacucho</SelectItem>
                      <SelectItem value="Lima Centro">Lima Centro</SelectItem>
                      <SelectItem value="San Juan de Lurigancho">San Juan de Lurigancho</SelectItem>
                      <SelectItem value="Callao">Callao</SelectItem>
                      <SelectItem value="Comas">Comas</SelectItem>
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
                      <SelectItem value="San Isidro">San Isidro</SelectItem>
                      <SelectItem value="Miraflores">Miraflores</SelectItem>
                      <SelectItem value="Surco">Surco</SelectItem>
                      <SelectItem value="La Molina">La Molina</SelectItem>
                      <SelectItem value="Barranco">Barranco</SelectItem>
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

          {/* Feedback Card */}
          {showFeedback && (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm animate-fade-in transition-all duration-500 ease-in-out">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">¡Tu retroalimentación es importante!</h3>
                </div>

                {feedbackSent ? (
                  <div className="text-center py-4">
                    <p className="text-green-400 text-lg font-medium">
                      ¡Gracias, tu retroalimentación fue enviada!
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-300">
                      Por favor confirma si los resultados coinciden con los incidentes del día {formatDate(date)} en el turno {turno}, zona {zone}, sector {sector}.
                    </p>

                    {!feedbackType && (
                      <div className="flex space-x-4 justify-center">
                        <Button
                          onClick={() => setFeedbackType('coincidio')}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                        >
                          Coincidió
                        </Button>
                        <Button
                          onClick={() => setFeedbackType('no-coincidio')}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                        >
                          No coincidió
                        </Button>
                      </div>
                    )}

                    {feedbackType && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-white">
                          {feedbackType === 'coincidio' 
                            ? '¿Cuáles de estos incidentes coincidieron?' 
                            : '¿Qué otros incidentes ocurrieron?'
                          }
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                          {getIncidentsForSelection().map((incident) => (
                            <div key={incident} className="flex items-center space-x-2">
                              <Checkbox
                                id={incident}
                                checked={selectedIncidents.includes(incident)}
                                onCheckedChange={(checked) => handleIncidentSelection(incident, checked as boolean)}
                                className="border-slate-400"
                              />
                              <label 
                                htmlFor={incident} 
                                className="text-slate-300 text-sm cursor-pointer hover:text-white transition-colors"
                              >
                                {incident}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-center space-x-4">
                          <Button
                            onClick={() => {
                              setFeedbackType(null);
                              setSelectedIncidents([]);
                            }}
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleFeedbackSubmit}
                            disabled={selectedIncidents.length === 0}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Enviar
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
