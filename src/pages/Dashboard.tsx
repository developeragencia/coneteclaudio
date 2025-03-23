import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  ArrowUpRight, FileBarChart2, Users, Wallet, Calendar, ArrowRight, ChevronRight, 
  DollarSign, TrendingUp, ArrowDown, ArrowUp, MoreHorizontal, LayoutDashboard,
  FileText, Info, AlertTriangle, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Atualizar SDK', status: 'inProgress', priority: 'high', dueDate: '2023-11-15' },
    { id: 2, title: 'Implementar autenticação', status: 'completed', priority: 'medium', dueDate: '2023-11-10' },
    { id: 3, title: 'Otimizar consultas ao banco de dados', status: 'pending', priority: 'low', dueDate: '2023-11-20' },
  ]);
  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', receita: 4000 },
    { month: 'Fev', receita: 3000 },
    { month: 'Mar', receita: 2000 },
    { month: 'Abr', receita: 2780 },
    { month: 'Mai', receita: 1890 },
    { month: 'Jun', receita: 2390 },
    { month: 'Jul', receita: 3490 },
    { month: 'Ago', receita: 3490 },
    { month: 'Set', receita: 3490 },
    { month: 'Out', receita: 3490 },
    { month: 'Nov', receita: 3490 },
    { month: 'Dez', receita: 3490 },
  ]);
  const [salesData, setSalesData] = useState([
    { name: 'Jan', vendas: 2400, amt: 2400 },
    { name: 'Fev', vendas: 1398, amt: 2210 },
    { name: 'Mar', vendas: 9800, amt: 2290 },
    { name: 'Abr', vendas: 3908, amt: 2000 },
    { name: 'Mai', vendas: 4800, amt: 2181 },
    { name: 'Jun', vendas: 3800, amt: 2500 },
    { name: 'Jul', vendas: 4300, amt: 2100 },
    { name: 'Ago', vendas: 4300, amt: 2100 },
    { name: 'Set', vendas: 4300, amt: 2100 },
    { name: 'Out', vendas: 4300, amt: 2100 },
    { name: 'Nov', vendas: 4300, amt: 2100 },
    { name: 'Dez', vendas: 4300, amt: 2100 },
  ]);
  const [topProducts, setTopProducts] = useState([
    { name: 'Produto A', vendas: 120 },
    { name: 'Produto B', vendas: 90 },
    { name: 'Produto C', vendas: 75 },
    { name: 'Produto D', vendas: 60 },
    { name: 'Produto E', vendas: 45 },
  ]);
  const [projectStatus, setProjectStatus] = useState([
    { name: 'Concluído', value: 350, color: '#60A5FA' },
    { name: 'Em Andamento', value: 400, color: '#34D399' },
    { name: 'Pendente', value: 500, color: '#F87171' },
  ]);
  const [activeTab, setActiveTab] = useState('visao-geral');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleTaskUpdate = (taskId: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    toast({
      title: "Tarefa atualizada!",
      description: `A tarefa foi movida para ${newStatus}.`,
    });
  };

  const renderContent = (status) => {
    if (status === 'inProgress') {
      return (
        <div className="text-amber-500 flex items-center">
          <FileText className="mr-1 h-4 w-4" />
          <span>Em processamento</span>
        </div>
      );
    } else if (status === 'completed') {
      return (
        <div className="text-green-500 flex items-center">
          <FileText className="mr-1 h-4 w-4" />
          <span>Concluído</span>
        </div>
      );
    } else if (status === 'pending') {
      return (
        <div className="text-muted-foreground flex items-center">
          <FileText className="mr-1 h-4 w-4" />
          <span>Pendente</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList>
          <TabsTrigger value="visao-geral" onClick={() => setActiveTab('visao-geral')}>Visão Geral</TabsTrigger>
          <TabsTrigger value="relatorios" onClick={() => setActiveTab('relatorios')}>Relatórios</TabsTrigger>
          <TabsTrigger value="analytics" onClick={() => setActiveTab('analytics')}>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Receita Total
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$45,231.89</div>
                <p className="text-sm text-muted-foreground">
                  +20.1% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Assinantes Ativos
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-sm text-muted-foreground">
                  +180.1% em relação ao ano passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Equipe
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">
                  +19% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Vendas
                </CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$12,456</div>
                <p className="text-sm text-muted-foreground">
                  +19% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="receita" stroke="#8884d8" fillOpacity={1} fill="url(#revenueGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Status do Projeto</CardTitle>
                <CardDescription>Visão geral do status atual dos projetos.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {projectStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Leads</CardTitle>
                <CardDescription>Número de leads qualificados.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">329</div>
                <p className="text-sm text-muted-foreground">
                  12% a mais que o mês anterior
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => handleNavigate('/leads')}>Ver Detalhes <ArrowRight className="ml-2" /></Button>
              </CardFooter>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Vendas Mensais</CardTitle>
                <CardDescription>Visão geral das vendas mensais.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="vendas" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Tarefas Recentes</CardTitle>
                <CardDescription>Suas tarefas mais recentes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Tarefa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Prioridade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Data de Entrega
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {tasks.map((task) => (
                        <tr key={task.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{task.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{renderContent(task.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{task.priority}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{task.dueDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {task.status !== 'completed' && (
                              <Button variant="secondary" size="sm" onClick={() => handleTaskUpdate(task.id, 'completed')}>
                                Concluir
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relatorios">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Vendas</CardTitle>
                <CardDescription>Análise detalhada das vendas por período.</CardDescription>
              </CardHeader>
              <CardContent>
                <FileBarChart2 className="h-10 w-10 mb-4" />
                <p className="text-sm text-muted-foreground">Visualize o desempenho das vendas, identifique tendências e tome decisões estratégicas.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleNavigate('/relatorios/vendas')}>Acessar Relatório <ChevronRight className="ml-2" /></Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Relatório de Desempenho</CardTitle>
                <CardDescription>Avaliação do desempenho geral da empresa.</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendingUp className="h-10 w-10 mb-4" />
                <p className="text-sm text-muted-foreground">Acompanhe os principais indicadores de desempenho, como receita, lucro e satisfação do cliente.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleNavigate('/relatorios/desempenho')}>Acessar Relatório <ChevronRight className="ml-2" /></Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Relatório de Marketing</CardTitle>
                <CardDescription>Análise do impacto das campanhas de marketing.</CardDescription>
              </CardHeader>
              <CardContent>
                <DollarSign className="h-10 w-10 mb-4" />
                <p className="text-sm text-muted-foreground">Meça o retorno sobre o investimento (ROI) das suas campanhas de marketing e otimize suas estratégias.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleNavigate('/relatorios/marketing')}>Acessar Relatório <ChevronRight className="ml-2" /></Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Visitantes</CardTitle>
                <CardDescription>Número de visitantes únicos no site.</CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="h-10 w-10 mb-4" />
                <div className="text-3xl font-bold">12,345</div>
                <p className="text-sm text-muted-foreground">+15% em relação ao mês passado</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleNavigate('/analytics/visitantes')}>Ver Detalhes <ChevronRight className="ml-2" /></Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Porcentagem de visitantes que realizaram uma ação desejada.</CardDescription>
              </CardHeader>
              <CardContent>
                <ArrowUp className="h-10 w-10 mb-4" />
                <div className="text-3xl font-bold">3.5%</div>
                <p className="text-sm text-muted-foreground">+0.5% em relação ao mês passado</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleNavigate('/analytics/conversao')}>Ver Detalhes <ChevronRight className="ml-2" /></Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio na Página</CardTitle>
                <CardDescription>Tempo que os visitantes passam em cada página.</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar className="h-10 w-10 mb-4" />
                <div className="text-3xl font-bold">2:30</div>
                <p className="text-sm text-muted-foreground">-10 segundos em relação ao mês passado</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleNavigate('/analytics/tempo-pagina')}>Ver Detalhes <ChevronRight className="ml-2" /></Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
