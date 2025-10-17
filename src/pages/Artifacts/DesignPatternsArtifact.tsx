import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, RotateCcw, Crown, Factory, Building2, Zap, Settings, Pizza, Car, Book, FileText } from 'lucide-react';
import { CodeBlockR } from '@/components/CodeBlockR';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'ERROR' | 'WARNING';
  message: string;
}

interface Animal {
  name: string;
  type: string;
  sound: string;
  emoji: string;
}

interface PizzaConfig {
  size: string;
  dough: string;
  sauce: string;
  cheese: boolean;
  toppings: string[];
}

interface Course {
  title: string;
  instructor: string;
  duration: number;
  difficulty: string;
  price: number;
  topics: string[];
  hasQuiz: boolean;
  hasCertificate: boolean;
}

const DesignPatternsArtifact = () => {
  const navigate = useNavigate();
  
  // Singleton Demo State (Logger)
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [newLogMessage, setNewLogMessage] = useState('');
  const [newLogLevel, setNewLogLevel] = useState<'INFO' | 'ERROR' | 'WARNING'>('INFO');
  const [singletonInstances, setSingletonInstances] = useState(0);
  
  // Factory Demo State (Animal Factory)
  const [selectedAnimalType, setSelectedAnimalType] = useState('caine');
  const [animalName, setAnimalName] = useState('');
  const [createdAnimals, setCreatedAnimals] = useState<Animal[]>([]);
  const [factoryOutput, setFactoryOutput] = useState('');
  
  // Builder Demo State (Pizza Builder)
  const [currentPizza, setCurrentPizza] = useState<PizzaConfig>({
    size: '',
    dough: '',
    sauce: '',
    cheese: false,
    toppings: []
  });
  const [pizzaSteps, setPizzaSteps] = useState<string[]>([]);
  const [completedPizzas, setCompletedPizzas] = useState<PizzaConfig[]>([]);
  
  // Combined System Demo State (Course Platform)
  const [currentCourse, setCurrentCourse] = useState<Course>({
    title: '',
    instructor: '',
    duration: 0,
    difficulty: 'Începător',
    price: 0,
    topics: [],
    hasQuiz: false,
    hasCertificate: false
  });
  const [courseBuilderSteps, setCourseBuilderSteps] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<'student' | 'instructor' | 'admin'>('student');
  const [systemLogs, setSystemLogs] = useState<LogEntry[]>([]);
  const [createdCourses, setCreatedCourses] = useState<Course[]>([]);
  
  // Active demo selector
  const [activeDemo, setActiveDemo] = useState('singleton');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Singleton Pattern Methods
  const addLogEntry = () => {
    if (newLogMessage.trim()) {
      const logEntry: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        level: newLogLevel,
        message: newLogMessage.trim()
      };
      
      // Simulate singleton - only one logger instance
      setLogs(prev => [...prev, logEntry]);
      setNewLogMessage('');
      setSingletonInstances(1); // Always 1 - that's the point!
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const simulateMultipleLoggers = () => {
    // Show that even with multiple "attempts" to create loggers, we still have just one
    setSingletonInstances(1);
    addLogEntry();
  };

  // Factory Pattern Methods  
  const createAnimal = () => {
    if (animalName.trim()) {
      const animalData = {
        caine: { sound: 'Ham ham!', emoji: '🐕' },
        pisica: { sound: 'Miau!', emoji: '🐱' },
        vaca: { sound: 'Muuu!', emoji: '🐄' },
        oaie: { sound: 'Beeee!', emoji: '🐑' },
        rata: { sound: 'Mac mac!', emoji: '🦆' }
      };

      const animal: Animal = {
        name: animalName.trim(),
        type: selectedAnimalType,
        sound: animalData[selectedAnimalType as keyof typeof animalData].sound,
        emoji: animalData[selectedAnimalType as keyof typeof animalData].emoji
      };

      setCreatedAnimals(prev => [...prev, animal]);
      setFactoryOutput(`🏭 Factory a creat: ${animal.emoji} ${animal.name} (${animal.type}) - "${animal.sound}"`);
      setAnimalName('');
    }
  };

  const demonstrateAllAnimals = () => {
    if (createdAnimals.length > 0) {
      const sounds = createdAnimals.map(animal => 
        `${animal.emoji} ${animal.name}: "${animal.sound}"`
      ).join('\n');
      setFactoryOutput(`🎵 Concert de animale:\n${sounds}`);
    }
  };

  // Builder Pattern Methods (Pizza)
  const addPizzaStep = (step: string, property: string, value: any) => {
    setPizzaSteps(prev => [...prev, step]);
    
    if (property === 'toppings') {
      setCurrentPizza(prev => ({
        ...prev,
        toppings: prev.toppings.includes(value) 
          ? prev.toppings.filter(t => t !== value)
          : [...prev.toppings, value]
      }));
    } else {
      setCurrentPizza(prev => ({ ...prev, [property]: value }));
    }
  };

  const finalizePizza = () => {
    if (currentPizza.size && currentPizza.dough && currentPizza.sauce) {
      setCompletedPizzas(prev => [...prev, { ...currentPizza }]);
      setPizzaSteps(prev => [...prev, `✅ Pizza finalizată! Preț: ${calculatePizzaPrice(currentPizza)} RON`]);
      
      // Reset builder
      setTimeout(() => {
        setCurrentPizza({
          size: '',
          dough: '',
          sauce: '',
          cheese: false,
          toppings: []
        });
        setPizzaSteps([]);
      }, 2000);
    }
  };

  const calculatePizzaPrice = (pizza: PizzaConfig): number => {
    let price = 0;
    
    // Base price by size
    const sizePrices = { 'Mică': 20, 'Medie': 30, 'Mare': 40 };
    price += sizePrices[pizza.size as keyof typeof sizePrices] || 0;
    
    // Dough price
    if (pizza.dough === 'Integrală') price += 5;
    if (pizza.dough === 'Fără gluten') price += 8;
    
    // Cheese
    if (pizza.cheese) price += 10;
    
    // Toppings
    price += pizza.toppings.length * 8;
    
    return price;
  };

  // Combined System Methods (Course Platform)
  const addCourseStep = (step: string, property: string, value: any) => {
    setCourseBuilderSteps(prev => [...prev, step]);
    
    if (property === 'topics') {
      setCurrentCourse(prev => ({
        ...prev,
        topics: prev.topics.includes(value) 
          ? prev.topics.filter(t => t !== value)
          : [...prev.topics, value]
      }));
    } else {
      setCurrentCourse(prev => ({ ...prev, [property]: value }));
    }
  };

  const createCourse = () => {
    if (currentCourse.title && currentCourse.instructor && currentCourse.duration > 0) {
      // Add to system logs (Singleton Logger)
      const logEntry: LogEntry = {
        id: `sys-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        message: `Cursul "${currentCourse.title}" a fost creat de ${userRole}: ${currentCourse.instructor}`
      };
      setSystemLogs(prev => [...prev, logEntry]);
      
      // Add to created courses
      setCreatedCourses(prev => [...prev, { ...currentCourse }]);
      
      setCourseBuilderSteps(prev => [...prev, `🎯 Curs finalizat! Preț: ${currentCourse.price} RON`]);
      
      // Reset builder
      setTimeout(() => {
        setCurrentCourse({
          title: '',
          instructor: '',
          duration: 0,
          difficulty: 'Începător',
          price: 0,
          topics: [],
          hasQuiz: false,
          hasCertificate: false
        });
        setCourseBuilderSteps([]);
      }, 2000);
    }
  };

  const calculateCoursePrice = () => {
    let price = currentCourse.duration * 50; // Base: 50 RON per hour
    
    // Difficulty multiplier
    const difficultyMultipliers = {
      'Începător': 1,
      'Intermediar': 1.5,
      'Avansat': 2
    };
    price *= difficultyMultipliers[currentCourse.difficulty as keyof typeof difficultyMultipliers];
    
    // Additional features
    if (currentCourse.hasQuiz) price += 100;
    if (currentCourse.hasCertificate) price += 200;
    
    return Math.round(price);
  };

  // Update course price when dependencies change
  useEffect(() => {
    const newPrice = calculateCoursePrice();
    if (newPrice !== currentCourse.price && (currentCourse.duration > 0 || currentCourse.difficulty || currentCourse.hasQuiz || currentCourse.hasCertificate)) {
      setCurrentCourse(prev => ({ ...prev, price: newPrice }));
    }
  }, [currentCourse.duration, currentCourse.difficulty, currentCourse.hasQuiz, currentCourse.hasCertificate]);

  const toggleCode = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  };

  useEffect(() => {
    // Add scroll animations
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/foundations')}
            className="hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi la Fundamente
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            📘 Sesiunea 8: Design Patterns în Python
          </h1>
        </div>

        {/* Introduction */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-lg artifact-card">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🏛️ Șabloanele Arhitecturii Software
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Imaginează-ți că ești arhitectul unui bloc. Nu reinventezi de fiecare dată cum construiești baia sau bucătăria → ai șabloane verificate.
              În programare, design pattern-urile sunt exact aceste șabloane: <strong>soluții standard la probleme comune</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <Crown className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold text-blue-800 mb-2">🔒 Singleton</h3>
                <p className="text-blue-700 text-sm">O singură instanță în tot programul</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <Factory className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold text-green-800 mb-2">🏭 Factory</h3>
                <p className="text-green-700 text-sm">Creează obiecte în mod centralizat</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <h3 className="font-semibold text-orange-800 mb-2">🧱 Builder</h3>
                <p className="text-orange-700 text-sm">Construire pas cu pas a obiectelor complexe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Selector */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-rose-600" />
            Design Patterns Interactive
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'singleton', label: 'Singleton Logger', icon: Crown },
              { id: 'factory', label: 'Animal Factory', icon: Factory },
              { id: 'builder', label: 'Pizza Builder', icon: Pizza },
              { id: 'combined', label: 'Sistem Complet', icon: Building2 }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeDemo === id ? "default" : "outline"}
                onClick={() => setActiveDemo(id)}
                className="h-auto p-3 flex flex-col items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs text-center">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Singleton Pattern Demo */}
        {activeDemo === 'singleton' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
              <Crown className="h-6 w-6" />
              1. Singleton Pattern - Un Singur Șef în Toată Compania
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">📝 Logger Global - O Singură Sursă de Adevăr</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Singleton Status */}
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">👑 Status Singleton</h5>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-blue-700">
                        Logger activ: <strong>1 instanță</strong> (întotdeauna!)
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Oricâte încercări de creare, va exista mereu o singură instanță
                    </p>
                  </div>

                  {/* Add Log Entry */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-700">✍️ Adaugă mesaj în log</h5>
                    <div className="flex gap-2">
                      <select
                        value={newLogLevel}
                        onChange={(e) => setNewLogLevel(e.target.value as 'INFO' | 'ERROR' | 'WARNING')}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="INFO">ℹ️ INFO</option>
                        <option value="WARNING">⚠️ WARNING</option>
                        <option value="ERROR">❌ ERROR</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Scrie mesajul..."
                      value={newLogMessage}
                      onChange={(e) => setNewLogMessage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      onKeyPress={(e) => e.key === 'Enter' && addLogEntry()}
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={addLogEntry}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                        size="sm"
                        disabled={!newLogMessage.trim()}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Adaugă în Log
                      </Button>
                      <Button 
                        onClick={clearLogs}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Curăță
                      </Button>
                    </div>
                  </div>

                  {/* Log Display */}
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">📋 Istoric Log ({logs.length} mesaje)</h5>
                    <div className="bg-gray-900 rounded-lg p-4 max-h-60 overflow-y-auto">
                      {logs.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">Fără mesaje în log...</p>
                      ) : (
                        logs.map((log) => (
                          <div key={log.id} className="mb-2 text-sm">
                            <span className="text-gray-400">[{log.timestamp}]</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              log.level === 'ERROR' ? 'bg-red-600 text-white' :
                              log.level === 'WARNING' ? 'bg-yellow-600 text-white' :
                              'bg-blue-600 text-white'
                            }`}>
                              {log.level}
                            </span>
                            <span className="text-green-400 ml-2">{log.message}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <CodeBlockR>
{`class Logger:
    """
    Singleton Pattern - o singură instanță în toată aplicația
    """
    _instance = None
    _initialized = False
    
    def __new__(cls):
        """
        Controlează crearea instanței - MAGIA Singleton!
        """
        if cls._instance is None:
            cls._instance = super(Logger, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        """
        Inițializează doar o dată, chiar dacă se apelează de mai multe ori
        """
        if not self._initialized:
            self.logs = []
            self._initialized = True
    
    def log(self, level, message):
        """Adaugă mesaj în log"""
        import datetime
        entry = {
            'timestamp': datetime.datetime.now().strftime('%H:%M:%S'),
            'level': level,
            'message': message
        }
        self.logs.append(entry)
        print(f"[{entry['timestamp']} {level}] {message}")
    
    def get_logs(self):
        """Returnează toate log-urile"""
        return self.logs
    
    def clear_logs(self):
        """Curăță log-urile"""
        self.logs.clear()

# Utilizare - încercăm să creăm mai multe instanțe:
logger1 = Logger()
logger2 = Logger()
logger3 = Logger()

# TOATE sunt aceeași instanță!
print(logger1 is logger2)  # True
print(logger2 is logger3)  # True
print(id(logger1) == id(logger2))  # True

# Toate scriu în același loc:
logger1.log("INFO", "Mesaj de la logger1")
logger2.log("ERROR", "Mesaj de la logger2") 
logger3.log("WARNING", "Mesaj de la logger3")

# Toate au aceleași log-uri:
print(len(logger1.get_logs()))  # 3
print(len(logger2.get_logs()))  # 3
print(len(logger3.get_logs()))  # 3

# 🎯 FOLOSIT în aplicații reale pentru:
# - Configurații globale
# - Conexiuni la baza de date
# - Cache-uri globale
# - System logs`}
                  </CodeBlockR>
                </div>
                
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">👑 De ce Singleton?</h5>
                  <ul className="text-blue-700 space-y-1 text-sm">
                    <li>• <strong>O singură sursă de adevăr</strong>: Toate modulele folosesc aceeași instanță</li>
                    <li>• <strong>Economie de resurse</strong>: Nu creezi obiecte duplicate</li>
                    <li>• <strong>Consistență</strong>: Configurații și stări globale uniforme</li>
                    <li>• <strong>Control centralizat</strong>: Un loc pentru gestionarea resurselor globale</li>
                    <li>• <strong>Thread-safe</strong>: (cu implementare corectă) sigur în aplicații multi-threaded</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Factory Pattern Demo */}
        {activeDemo === 'factory' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <Factory className="h-6 w-6" />
              2. Factory Pattern - Fabrica de Animale
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🏭 Ferma cu Fabrică Centralizată</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Animal Creation */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h5 className="font-medium text-gray-700">🎯 Creează Animal Nou</h5>
                    <input
                      type="text"
                      placeholder="Numele animalului..."
                      value={animalName}
                      onChange={(e) => setAnimalName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'caine', label: '🐕 Câine', color: 'bg-yellow-100 border-yellow-300' },
                        { value: 'pisica', label: '🐱 Pisică', color: 'bg-orange-100 border-orange-300' },
                        { value: 'vaca', label: '🐄 Vacă', color: 'bg-green-100 border-green-300' },
                        { value: 'oaie', label: '🐑 Oaie', color: 'bg-blue-100 border-blue-300' },
                        { value: 'rata', label: '🦆 Rață', color: 'bg-purple-100 border-purple-300' }
                      ].map(({value, label, color}) => (
                        <button
                          key={value}
                          onClick={() => setSelectedAnimalType(value)}
                          className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                            selectedAnimalType === value 
                              ? `${color} ring-2 ring-green-500` 
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <Button 
                      onClick={createAnimal}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!animalName.trim()}
                    >
                      <Factory className="w-4 h-4 mr-2" />
                      Creează prin Factory!
                    </Button>
                  </div>

                  {/* Created Animals */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium text-gray-700">🦆 Animale Create ({createdAnimals.length})</h5>
                      {createdAnimals.length > 0 && (
                        <Button 
                          onClick={demonstrateAllAnimals}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Concert!
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                      {createdAnimals.map((animal, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="text-center">
                            <div className="text-2xl mb-1">{animal.emoji}</div>
                            <p className="font-medium text-gray-800 text-sm">{animal.name}</p>
                            <p className="text-xs text-gray-600 capitalize">{animal.type}</p>
                            <p className="text-xs text-blue-600 italic">"{animal.sound}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Factory Output */}
                  {factoryOutput && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">🏭 Output Factory:</h5>
                      <pre className="text-green-700 text-sm whitespace-pre-line">{factoryOutput}</pre>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <CodeBlockR>
{`# Clasele de animale (toate au aceeași interfață)
class Animal:
    def __init__(self, nume):
        self.nume = nume
    
    def face_sunet(self):
        pass

class Caine(Animal):
    def face_sunet(self):
        return f"{self.nume}: Ham ham! 🐕"

class Pisica(Animal):
    def face_sunet(self):
        return f"{self.nume}: Miau! 🐱"

class Vaca(Animal):
    def face_sunet(self):
        return f"{self.nume}: Muuu! 🐄"

class Oaie(Animal):
    def face_sunet(self):
        return f"{self.nume}: Beeee! 🐑"

class Rata(Animal):
    def face_sunet(self):
        return f"{self.nume}: Mac mac! 🦆"

# FACTORY PATTERN - creează animalele centralizat
class AnimalFactory:
    """
    Factory care știe să creeze orice tip de animal
    """
    
    @staticmethod
    def creeaza_animal(tip_animal, nume):
        """
        Metoda principală - primește tipul și returnează obiectul
        """
        if tip_animal.lower() == "caine":
            return Caine(nume)
        elif tip_animal.lower() == "pisica":
            return Pisica(nume)
        elif tip_animal.lower() == "vaca":
            return Vaca(nume)
        elif tip_animal.lower() == "oaie":
            return Oaie(nume)
        elif tip_animal.lower() == "rata":
            return Rata(nume)
        else:
            raise ValueError(f"Tipul '{tip_animal}' nu este suportat!")

# UTILIZARE - mult mai simplă!
def creeaza_ferma():
    factory = AnimalFactory()
    
    # În loc să scrii manual:
    # if tip == "caine": animal = Caine(nume)
    # elif tip == "pisica": animal = Pisica(nume)
    # ... (repetitiv și urat)
    
    # Folosești factory-ul:
    animale = []
    animale.append(factory.creeaza_animal("caine", "Rex"))
    animale.append(factory.creeaza_animal("pisica", "Mimi"))
    animale.append(factory.creeaza_animal("vaca", "Maia"))
    
    # Concert de animale:
    for animal in animale:
        print(animal.face_sunet())

# 🎯 AVANTAJE Factory Pattern:
# ✅ Centralizează logica de creare
# ✅ Ușor de extins (adaugi noi animale)  
# ✅ Codul client nu știe de clase specifice
# ✅ Respectă principiul "Open/Closed"`}
                  </CodeBlockR>
                </div>
                
                <div className="mt-4 bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">🏭 De ce Factory?</h5>
                  <ul className="text-green-700 space-y-1 text-sm">
                    <li>• <strong>Centralizare</strong>: O singură funcție pentru a crea orice tip</li>
                    <li>• <strong>Flexibilitate</strong>: Adaugi noi tipuri fără să modifici codul existent</li>
                    <li>• <strong>Simplificare</strong>: Elimini if-else-uri repetitive din codul client</li>
                    <li>• <strong>Încapsulare</strong>: Clientul nu știe despre clasele concrete</li>
                    <li>• <strong>Configurabilitate</strong>: Poți crea obiecte din configurație sau input</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Builder Pattern Demo */}
        {activeDemo === 'builder' && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-orange-800 mb-6 flex items-center gap-2">
              <Pizza className="h-6 w-6" />
              3. Builder Pattern - Construiește-ți Pizza Perfectă
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🍕 Pizzeria cu Builder Interactiv</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* Current Pizza Status */}
                  <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                    <h5 className="font-semibold text-orange-800 mb-2">🍕 Pizza în construcție</h5>
                    <div className="text-sm text-orange-700 space-y-1">
                      <p>📏 Mărime: {currentPizza.size || '❓ Nu ai ales'}</p>
                      <p>🫓 Aluat: {currentPizza.dough || '❓ Nu ai ales'}</p>
                      <p>🍅 Sos: {currentPizza.sauce || '❓ Nu ai ales'}</p>
                      <p>🧀 Brânză: {currentPizza.cheese ? '✅ Da' : '❌ Nu'}</p>
                      <p>🥬 Toppings ({currentPizza.toppings.length}): {currentPizza.toppings.join(', ') || 'Nimic'}</p>
                      {(currentPizza.size && currentPizza.dough && currentPizza.sauce) && (
                        <p className="font-bold text-green-600">💰 Preț estimat: {calculatePizzaPrice(currentPizza)} RON</p>
                      )}
                    </div>
                  </div>

                  {/* Builder Steps */}
                  <div className="space-y-3">
                    {/* Size Selection */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">1️⃣ Alege mărimea:</h6>
                      <div className="grid grid-cols-3 gap-2">
                        {['Mică', 'Medie', 'Mare'].map(size => (
                          <button
                            key={size}
                            onClick={() => addPizzaStep(`1️⃣ Mărime selectată: ${size}`, 'size', size)}
                            className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                              currentPizza.size === size 
                                ? 'bg-orange-100 border-orange-500 ring-2 ring-orange-300' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dough Selection */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">2️⃣ Alege alatul:</h6>
                      <div className="grid grid-cols-3 gap-2">
                        {['Tradițional', 'Integrală', 'Fără gluten'].map(dough => (
                          <button
                            key={dough}
                            onClick={() => addPizzaStep(`2️⃣ Aluat selectat: ${dough}`, 'dough', dough)}
                            className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                              currentPizza.dough === dough 
                                ? 'bg-orange-100 border-orange-500 ring-2 ring-orange-300' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {dough}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sauce Selection */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">3️⃣ Alege sosul:</h6>
                      <div className="grid grid-cols-3 gap-2">
                        {['Roșii', 'Alb', 'Pesto'].map(sauce => (
                          <button
                            key={sauce}
                            onClick={() => addPizzaStep(`3️⃣ Sos selectat: ${sauce}`, 'sauce', sauce)}
                            className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                              currentPizza.sauce === sauce 
                                ? 'bg-orange-100 border-orange-500 ring-2 ring-orange-300' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {sauce}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cheese */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">4️⃣ Adaugă brânză?</h6>
                      <button
                        onClick={() => {
                          addPizzaStep(`4️⃣ Brânză: ${!currentPizza.cheese ? 'Adăugată' : 'Eliminată'}`, 'cheese', !currentPizza.cheese);
                        }}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          currentPizza.cheese 
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-800' 
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        🧀 {currentPizza.cheese ? 'Cu brânză ✅' : 'Fără brânză'}
                      </button>
                    </div>

                    {/* Toppings */}
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-2">5️⃣ Alege toppings:</h6>
                      <div className="grid grid-cols-2 gap-2">
                        {['Pepperoni', 'Șuncă', 'Ciuperci', 'Ardei', 'Măsline', 'Ananas'].map(topping => (
                          <button
                            key={topping}
                            onClick={() => {
                              const action = currentPizza.toppings.includes(topping) ? 'Eliminat' : 'Adăugat';
                              addPizzaStep(`5️⃣ ${action}: ${topping}`, 'toppings', topping);
                            }}
                            className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                              currentPizza.toppings.includes(topping) 
                                ? 'bg-green-100 border-green-500 text-green-800' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {topping} {currentPizza.toppings.includes(topping) ? '✅' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Finalize Button */}
                    {currentPizza.size && currentPizza.dough && currentPizza.sauce && (
                      <Button 
                        onClick={finalizePizza}
                        className="w-full bg-orange-600 hover:bg-orange-700 mt-4"
                      >
                        <Pizza className="w-4 h-4 mr-2" />
                        🍕 Finalizează Pizza ({calculatePizzaPrice(currentPizza)} RON)
                      </Button>
                    )}
                  </div>

                  {/* Builder Steps Log */}
                  {pizzaSteps.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">📋 Pașii Construcției:</h5>
                      <div className="space-y-1">
                        {pizzaSteps.map((step, index) => (
                          <p key={index} className="text-green-700 text-sm">• {step}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed Pizzas */}
                  {completedPizzas.length > 0 && (
                    <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                      <h5 className="font-semibold text-purple-800 mb-2">🍕 Pizze Finalizate ({completedPizzas.length}):</h5>
                      <div className="space-y-2">
                        {completedPizzas.slice(-3).map((pizza, index) => (
                          <div key={index} className="text-xs text-purple-700 bg-white rounded p-2">
                            {pizza.size} • {pizza.dough} • Sos {pizza.sauce} • 
                            {pizza.cheese ? ' Cu brânză' : ' Fără brânză'} • 
                            Toppings: {pizza.toppings.join(', ') || 'Nimic'} • 
                            <strong>{calculatePizzaPrice(pizza)} RON</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <CodeBlockR>
{`class Pizza:
    """Produsul final complex"""
    def __init__(self):
        self.marime = None
        self.aluat = None
        self.sos = None
        self.branza = False
        self.toppings = []
        self.pret = 0
    
    def __str__(self):
        toppings_text = ", ".join(self.toppings) if self.toppings else "Fără toppings"
        branza_text = "cu brânză" if self.branza else "fără brânză"
        return f"🍕 Pizza {self.marime} cu aluat {self.aluat}, sos {self.sos}, {branza_text}, toppings: {toppings_text} - {self.pret} RON"

class PizzaBuilder:
    """
    Builder Pattern - construire pas cu pas
    """
    def __init__(self):
        self.pizza = Pizza()
    
    def set_marime(self, marime):
        """Pas 1: Setează mărimea"""
        self.pizza.marime = marime
        print(f"🔧 Mărime setată: {marime}")
        return self  # Return self pentru method chaining!
    
    def set_aluat(self, aluat):
        """Pas 2: Setează alatul"""
        self.pizza.aluat = aluat
        print(f"🔧 Aluat setat: {aluat}")
        return self
    
    def set_sos(self, sos):
        """Pas 3: Setează sosul"""
        self.pizza.sos = sos
        print(f"🔧 Sos setat: {sos}")
        return self
    
    def add_branza(self):
        """Pas 4: Adaugă brânză"""
        self.pizza.branza = True
        print("🔧 Brânză adăugată")
        return self
    
    def add_topping(self, topping):
        """Pas 5: Adaugă topping"""
        self.pizza.toppings.append(topping)
        print(f"🔧 Topping adăugat: {topping}")
        return self
    
    def calculeaza_pret(self):
        """Calculează prețul final"""
        pret = {'Mică': 20, 'Medie': 30, 'Mare': 40}[self.pizza.marime]
        
        if self.pizza.aluat == 'Integrală': pret += 5
        if self.pizza.aluat == 'Fără gluten': pret += 8
        if self.pizza.branza: pret += 10
        pret += len(self.pizza.toppings) * 8
        
        self.pizza.pret = pret
        return self
    
    def build(self):
        """Finalizează și returnează pizza"""
        self.calculeaza_pret()
        pizza_finala = self.pizza
        self.pizza = Pizza()  # Reset pentru următoarea pizza
        print("✅ Pizza finalizată!")
        return pizza_finala

# UTILIZARE - Method Chaining elegant!
builder = PizzaBuilder()

pizza1 = (builder
          .set_marime("Mare")
          .set_aluat("Integrală") 
          .set_sos("Roșii")
          .add_branza()
          .add_topping("Pepperoni")
          .add_topping("Ciuperci")
          .build())

print(pizza1)

# Alternativ - pas cu pas:
pizza2 = PizzaBuilder()
pizza2.set_marime("Mică")
pizza2.set_aluat("Tradițional")
pizza2.set_sos("Alb")
pizza2.add_topping("Șuncă")
result = pizza2.build()

print(result)`}
                  </CodeBlockR>
                </div>
                
                <div className="mt-4 bg-orange-50 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">🧱 De ce Builder?</h5>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• <strong>Construcție pas cu pas</strong>: Nu trebuie să setezi totul dintr-o dată</li>
                    <li>• <strong>Method chaining</strong>: Sintaxă elegantă cu `.metodă1().metodă2()`</li>
                    <li>• <strong>Flexibilitate</strong>: Poți sări pași sau schimba ordinea</li>
                    <li>• <strong>Validare</strong>: Poți verifica fiecare pas înainte să continui</li>
                    <li>• <strong>Obiecte complexe</strong>: Perfect pentru obiecte cu multe opțiuni configurabile</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Combined System Demo */}
        {activeDemo === 'combined' && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 mb-8 shadow-lg artifact-card">
            <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              4. Sistem Complet - Platformă Educațională cu Toate Pattern-urile
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🎓 Blue Pigeon Academy - Sistem Integrat</h4>
                <div className="bg-white rounded-xl p-6 space-y-4">
                  {/* User Role Selection */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-700 mb-2">👤 Rolul tău în platformă:</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'student', label: '🎓 Student', color: 'bg-blue-100 border-blue-300' },
                        { value: 'instructor', label: '👨‍🏫 Instructor', color: 'bg-green-100 border-green-300' },
                        { value: 'admin', label: '👑 Admin', color: 'bg-purple-100 border-purple-300' }
                      ].map(({value, label, color}) => (
                        <button
                          key={value}
                          onClick={() => setUserRole(value as 'student' | 'instructor' | 'admin')}
                          className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                            userRole === value 
                              ? `${color} ring-2 ring-purple-500` 
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Course Builder (Available to Instructors & Admins) */}
                  {(userRole === 'instructor' || userRole === 'admin') && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h5 className="font-semibold text-green-800 mb-3">🧱 Course Builder (Builder Pattern)</h5>
                      
                      {/* Current Course Status */}
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-700">
                          📚 <strong>Titlu:</strong> {currentCourse.title || '❓ Nu ai setat'}
                        </p>
                        <p className="text-sm text-gray-700">
                          👨‍🏫 <strong>Instructor:</strong> {currentCourse.instructor || '❓ Nu ai setat'}  
                        </p>
                        <p className="text-sm text-gray-700">
                          ⏱️ <strong>Durată:</strong> {currentCourse.duration || 0} ore
                        </p>
                        <p className="text-sm text-gray-700">
                          🎯 <strong>Nivel:</strong> {currentCourse.difficulty}
                        </p>
                        <p className="text-sm text-gray-700">
                          📋 <strong>Subiecte:</strong> {currentCourse.topics.join(', ') || 'Niciunul'}
                        </p>
                        <p className="text-sm text-gray-700">
                          💰 <strong>Preț:</strong> {currentCourse.price} RON
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Titlu curs..."
                          value={currentCourse.title}
                          onChange={(e) => addCourseStep(`📚 Titlu setat: ${e.target.value}`, 'title', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Instructor..."
                          value={currentCourse.instructor}
                          onChange={(e) => addCourseStep(`👨‍🏫 Instructor setat: ${e.target.value}`, 'instructor', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          placeholder="Durată (ore)..."
                          value={currentCourse.duration || ''}
                          onChange={(e) => addCourseStep(`⏱️ Durată setată: ${e.target.value} ore`, 'duration', Number(e.target.value))}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <select
                          value={currentCourse.difficulty}
                          onChange={(e) => addCourseStep(`🎯 Nivel setat: ${e.target.value}`, 'difficulty', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="Începător">Începător</option>
                          <option value="Intermediar">Intermediar</option>
                          <option value="Avansat">Avansat</option>
                        </select>
                      </div>

                      <div className="flex gap-2 mb-2">
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={currentCourse.hasQuiz}
                            onChange={(e) => addCourseStep(`📝 Quiz ${e.target.checked ? 'activat' : 'dezactivat'}`, 'hasQuiz', e.target.checked)}
                          />
                          📝 Are quiz
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={currentCourse.hasCertificate}
                            onChange={(e) => addCourseStep(`🏆 Certificat ${e.target.checked ? 'activat' : 'dezactivat'}`, 'hasCertificate', e.target.checked)}
                          />
                          🏆 Are certificat
                        </label>
                      </div>

                      <div className="grid grid-cols-3 gap-1 mb-3">
                        {['Python', 'JavaScript', 'OOP', 'Algoritmi', 'Web Dev', 'AI'].map(topic => (
                          <button
                            key={topic}
                            onClick={() => {
                              const action = currentCourse.topics.includes(topic) ? 'eliminat' : 'adăugat';
                              addCourseStep(`📋 Subiect ${action}: ${topic}`, 'topics', topic);
                            }}
                            className={`p-1 rounded border text-xs ${
                              currentCourse.topics.includes(topic) 
                                ? 'bg-purple-100 border-purple-300 text-purple-800' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {topic} {currentCourse.topics.includes(topic) ? '✅' : ''}
                          </button>
                        ))}
                      </div>

                      <Button 
                        onClick={createCourse}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="sm"
                        disabled={!currentCourse.title || !currentCourse.instructor || currentCourse.duration === 0}
                      >
                        <Book className="w-4 h-4 mr-1" />
                        Creează Curs ({currentCourse.price} RON)
                      </Button>
                    </div>
                  )}

                  {/* System Logs (Singleton Logger) */}
                  <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2">📝 System Logs (Singleton Logger)</h5>
                    <div className="bg-gray-900 rounded-lg p-3 max-h-32 overflow-y-auto">
                      {systemLogs.length === 0 ? (
                        <p className="text-gray-500 text-xs italic">Fără activitate în sistem...</p>
                      ) : (
                        systemLogs.slice(-5).map((log) => (
                          <div key={log.id} className="mb-1 text-xs">
                            <span className="text-gray-400">[{log.timestamp}]</span>
                            <span className="text-green-400 ml-2">{log.message}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Created Courses */}
                  {createdCourses.length > 0 && (
                    <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                      <h5 className="font-semibold text-purple-800 mb-2">🎓 Cursuri Create ({createdCourses.length})</h5>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {createdCourses.slice(-3).map((course, index) => (
                          <div key={index} className="text-xs text-purple-700 bg-white rounded p-2">
                            <strong>{course.title}</strong> de {course.instructor} • 
                            {course.duration}h • {course.difficulty} • 
                            {course.topics.length} subiecte • 
                            <strong>{course.price} RON</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Builder Steps */}
                  {courseBuilderSteps.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                      <h5 className="font-semibold text-green-800 mb-2">🔧 Pașii Construcției:</h5>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {courseBuilderSteps.slice(-5).map((step, index) => (
                          <p key={index} className="text-green-700 text-xs">• {step}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">🐍 Codul Python</h4>
                <div className="bg-gray-900 rounded-xl p-6 text-sm">
                  <CodeBlockR>
{`# SISTEM COMPLET cu toate pattern-urile!

# 1. SINGLETON - Logger Global
class SystemLogger:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.logs = []
        return cls._instance
    
    def log(self, message):
        import datetime
        entry = {
            'timestamp': datetime.datetime.now().strftime('%H:%M:%S'),
            'message': message
        }
        self.logs.append(entry)
        print(f"[LOG {entry['timestamp']} {message}")

# 2. FACTORY - User Factory
class UserFactory:
    @staticmethod
    def create_user(role, nume, email):
        if role == "student":
            return Student(nume, email)
        elif role == "instructor":
            return Instructor(nume, email)
        elif role == "admin":
            return Admin(nume, email)
        else:
            raise ValueError(f"Rol necunoscut: {role}")

class User:
    def __init__(self, nume, email):
        self.nume = nume
        self.email = email

class Student(User):
    def __init__(self, nume, email):
        super().__init__(nume, email)
        self.cursuri_inscrise = []

class Instructor(User):
    def __init__(self, nume, email):
        super().__init__(nume, email)
        self.cursuri_create = []

class Admin(User):
    def __init__(self, nume, email):
        super().__init__(nume, email)
        self.permisiuni = ['create', 'read', 'update', 'delete']

# 3. BUILDER - Course Builder  
class CourseBuilder:
    def __init__(self):
        self.course = {
            'title': '',
            'instructor': '',
            'duration': 0,
            'difficulty': 'Începător',
            'topics': [],
            'has_quiz': False,
            'has_certificate': False,
            'price': 0
        }
        self.logger = SystemLogger()  # Singleton!
    
    def set_title(self, title):
        self.course['title'] = title
        self.logger.log(f"Titlu setat: {title}")
        return self
    
    def set_instructor(self, instructor):
        self.course['instructor'] = instructor
        self.logger.log(f"Instructor setat: {instructor}")
        return self
    
    def set_duration(self, hours):
        self.course['duration'] = hours
        self._calculate_price()
        self.logger.log(f"Durată setată: {hours} ore")
        return self
    
    def add_topic(self, topic):
        if topic not in self.course['topics']:
            self.course['topics'].append(topic)
            self.logger.log(f"Subiect adăugat: {topic}")
        return self
    
    def _calculate_price(self):
        """Calculează prețul automat"""
        base_price = self.course['duration'] * 50
        
        if self.course['difficulty'] == 'Intermediar':
            base_price *= 1.5
        elif self.course['difficulty'] == 'Avansat':
            base_price *= 2
            
        if self.course['has_quiz']:
            base_price += 100
        if self.course['has_certificate']:
            base_price += 200
            
        self.course['price'] = int(base_price)
    
    def build(self):
        self._calculate_price()
        self.logger.log(f"Curs finalizat: {self.course['title']}")
        return self.course.copy()

# UTILIZARE - toate pattern-urile împreună:
def main():
    # Singleton logger
    logger = SystemLogger()
    
    # Factory pentru utilizatori
    factory = UserFactory()
    instructor = factory.create_user("instructor", "Prof. Ana", "ana@academy.com")
    student = factory.create_user("student", "Ion Student", "ion@student.com")
    
    # Builder pentru curs
    course = (CourseBuilder()
              .set_title("Python Fundamentals")
              .set_instructor("Prof. Ana")
              .set_duration(10)
              .add_topic("Variables")
              .add_topic("Functions")
              .add_topic("OOP")
              .build())
    
    print(f"Curs creat: {course}")
    
    # Toate log-urile sunt în aceeași instanță!
    for log in logger.logs:
        print(f"📝 {log['timestamp']}: {log['message']}")

if __name__ == "__main__":
    main()`}
                  </CodeBlockR>
                </div>
                
                <div className="mt-4 bg-purple-50 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-800 mb-2">🏗️ Pattern-urile în Echipă</h5>
                  <ul className="text-purple-700 space-y-1 text-sm">
                    <li>• <strong>Singleton Logger</strong>: O singură sursă pentru toate log-urile sistemului</li>
                    <li>• <strong>Factory pentru Users</strong>: Creează tipuri diferite de utilizatori centralizat</li>
                    <li>• <strong>Builder pentru Courses</strong>: Construiește cursuri complexe pas cu pas</li>
                    <li>• <strong>Colaborare naturală</strong>: Pattern-urile se completează reciproc</li>
                    <li>• <strong>Cod scalabil</strong>: Ușor de extins și menținut</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Final Message */}
        <div className="bg-gradient-to-r from-rose-600 to-purple-600 rounded-3xl p-8 text-white text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">🏛️ Design Patterns - Șabloanele Maeștrilor</h2>
          <p className="text-xl mb-6 opacity-90">
            Pattern-urile nu sunt doar teorie - sunt soluții practice la probleme reale pe care le vei întâlni în orice proiect.
            Ele fac diferența între un cod care funcționează și un cod care durează în timp.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 rounded-xl p-6">
              <Crown className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Singleton</h3>
              <p className="text-sm opacity-90">O instanță, control global</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <Factory className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Factory</h3>
              <p className="text-sm opacity-90">Creează obiecte centralizat</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <Building2 className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Builder</h3>
              <p className="text-sm opacity-90">Construcție pas cu pas</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-lg font-medium mb-4">
              🎯 Din probleme comune la soluții elegante - Arta Arhitecturii Software
            </p>
            <Button 
              onClick={() => navigate('/foundations')}
              className="bg-white text-rose-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
            >
              Înapoi la Fundamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPatternsArtifact;