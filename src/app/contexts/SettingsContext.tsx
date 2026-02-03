import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'es' | 'en';
type Theme = 'light' | 'dark';
type TempUnit = 'C' | 'F';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  tempUnit: TempUnit;
  toggleTempUnit: () => void;
  convertTemp: (celsius: number) => number;
  formatTemp: (celsius: number) => string;
  t: (key: string, replacements?: Record<string, string> | string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'dashboard': 'Panel de Control',
    'control': 'Control de Dispositivos',
    'monitoring': 'Monitoreo y Análisis',
    'processes': 'Seguimiento (Plus)',
    'recipes': 'Recetas (Plus)',
    'users': 'Usuarios (Plus)',
    'settings': 'Configuración',
    'help': 'Ayuda y Soporte',
    'logout': 'Cerrar Sesión',
    'profile': 'Mi Perfil',
    'operator': 'Operador',
    'search_placeholder': 'Buscar dispositivo...',
    'search_process_placeholder': 'Buscar por cliente, lote o producto...',

    // Dashboard
    'active_units': 'Unidades Activas',
    'active_alarms': 'Alarmas Activas',
    'completed_processes': 'Procesos Completados',
    'total_consumption': 'Consumo Total',
    'fleet_status': 'Estado de Flota',
    'of_total': 'De {{total}} total',
    'require_attention': 'Requieren atención',
    'this_week': 'Esta semana',
    'historical_accumulated': 'Acumulado histórico',
    'error_loading_devices': 'Error al cargar dispositivos',

    // Device Detail
    'device_not_found': 'Dispositivo no encontrado',
    'operation': 'Operación',
    'analysis': 'Análisis',
    'current_process_status': 'Estado del Proceso Actual',
    'operational_data': 'Datos Operacionales',
    'no_active_process': 'No hay proceso activo',
    'power_consumption': 'Consumo Energía',
    'total_accumulated': 'Total Acumulado',
    'defrost_interval': 'Intervalo Defrost',
    'evaporation_coil': 'Bobina Evaporación',
    'recipe': 'Receta',
    'phase': 'Fase',
    'start': 'Inicio',
    'estimated_end': 'Fin Estimado',
    'back': 'Volver',
    'historical_data': 'Datos Históricos',
    'last_12_hours': 'Últimas 12 Horas',

    // Control Panel
    'manual_mode': 'Manual',
    'homogenization': 'Homogenización',
    'ripening': 'Maduración',
    'ventilation': 'Ventilación',
    'cooling': 'Enfriamiento',
    'device_status': 'Estado del Equipo',
    'climatization': 'Climatización',
    'target_temperature': 'Temperatura Objetivo',
    'relative_humidity': 'Humedad Relativa',
    'gases_ventilation': 'Gases y Ventilación',
    'ethylene_injection': 'Inyección Etileno',
    'ventilation_speed': 'Velocidad Ventilación',
    'apply_changes': 'Aplicar Cambios',
    'confirm_changes': 'Confirmar Cambios',
    'applying': 'Aplicando...',
    'confirm_changes_desc': 'Se aplicarán los siguientes cambios en el dispositivo:',
    'environmental_conditions': 'Condiciones Ambientales',
    'target_co2': 'CO2 Objetivo',
    'duration': 'Duración',
    'preview': 'Previsualización',
    'start_process': 'Iniciar Proceso',
    'starting': 'Iniciando...',
    'cancel': 'Cancelar',
    'final_temperature': 'Temperatura Final',
    'estimated_duration': 'Duración Estimada',
    'co2_limit': 'Límite CO2',
    'process_time': 'Tiempo de Proceso',
    'max_duration': 'Duración Máxima',
    'cooling_ramp': 'Rampa de Enfriamiento',

    // Process List
    'process_tracking': 'Seguimiento de Procesos',
    'process_tracking_desc': 'Gestione lotes activos, historial y nuevos servicios.',
    'new_process': 'Nuevo Proceso',
    'filters': 'Filtros',
    'in_process': 'EN PROCESO',
    'attention': 'ATENCIÓN',
    'current_phase': 'Fase Actual',
    'estimated_progress': 'Progreso Estimado',
    'view_details': 'Ver Detalles',
    'start_new_process': 'Iniciar Nuevo Proceso',
    'start_new_process_desc': 'Configure un nuevo lote y asigne una receta de maduración.',

    // Create Process Form
    'new_maturation_process': 'Nuevo Proceso de Maduración',
    'new_process_desc': 'Ingrese los datos del lote y configure los parámetros iniciales.',
    'client_info': 'Información del Cliente',
    'client_type': 'Tipo de Cliente',
    'client_name': 'Nombre del Cliente / Empresa',
    'batch_details': 'Detalles del Lote',
    'product': 'Producto',
    'quantity_kg': 'Cantidad (kg)',
    'control_device': 'Dispositivo Control',
    'recipe_planning': 'Receta y Planificación',
    'select_recipe_library': 'Seleccionar Receta de Biblioteca',
    'create_edit_custom': 'Crear/Editar Personalizada',

    // Users
    'user_management': 'Gestión de Usuarios',
    'new_user': 'Nuevo Usuario',
    'system_users': 'Usuarios del Sistema',
    'user': 'Usuario',
    'email': 'Email',
    'role': 'Rol',
    'status': 'Estado',
    'actions': 'Acciones',
    'edit': 'Editar',
    'active': 'Activo',
    'inactive': 'Inactivo',
    
    // Status
    'status_active': 'Activo',
    'status_warning': 'Advertencia',
    'status_alarm': 'Alarma',
    'status_offline': 'Fuera de Línea',

    // Historical Modal
    'date_range': 'Rango de Fechas',
    'data_to_visualize': 'Datos a Visualizar',
    'generate_chart': 'Generar Gráfico',
    'temperature': 'Temperatura',
    'humidity': 'Humedad',
    'ethylene': 'Etileno',
    'co2': 'CO2',
    'process_summary': 'Resumen del Proceso',
    'viewing_history': 'Visualizando Historial',
    'close': 'Cerrar',
  },
  en: {
    // Navigation
    'dashboard': 'Dashboard',
    'control': 'Device Control',
    'monitoring': 'Monitoring & Analysis',
    'processes': 'Tracking (Plus)',
    'recipes': 'Recipes (Plus)',
    'users': 'Users (Plus)',
    'settings': 'Settings',
    'help': 'Help & Support',
    'logout': 'Log Out',
    'profile': 'My Profile',
    'operator': 'Operator',
    'search_placeholder': 'Search device...',
    'search_process_placeholder': 'Search by client, batch or product...',

    // Dashboard
    'active_units': 'Active Units',
    'active_alarms': 'Active Alarms',
    'completed_processes': 'Completed Processes',
    'total_consumption': 'Total Consumption',
    'fleet_status': 'Fleet Status',
    'of_total': 'Of {{total}} total',
    'require_attention': 'Require attention',
    'this_week': 'This week',
    'historical_accumulated': 'Historical accumulated',
    'error_loading_devices': 'Error loading devices',

    // Device Detail
    'device_not_found': 'Device not found',
    'operation': 'Operation',
    'analysis': 'Analysis',
    'current_process_status': 'Current Process Status',
    'operational_data': 'Operational Data',
    'no_active_process': 'No active process',
    'power_consumption': 'Power Consumption',
    'total_accumulated': 'Total Accumulated',
    'defrost_interval': 'Defrost Interval',
    'evaporation_coil': 'Evaporation Coil',
    'recipe': 'Recipe',
    'phase': 'Phase',
    'start': 'Start',
    'estimated_end': 'Estimated End',
    'back': 'Back',
    'historical_data': 'Historical Data',
    'last_12_hours': 'Last 12 Hours',

    // Control Panel
    'manual_mode': 'Manual',
    'homogenization': 'Homogenization',
    'ripening': 'Ripening',
    'ventilation': 'Ventilation',
    'cooling': 'Cooling',
    'device_status': 'Device Status',
    'climatization': 'Climatization',
    'target_temperature': 'Target Temperature',
    'relative_humidity': 'Relative Humidity',
    'gases_ventilation': 'Gases & Ventilation',
    'ethylene_injection': 'Ethylene Injection',
    'ventilation_speed': 'Ventilation Speed',
    'apply_changes': 'Apply Changes',
    'confirm_changes': 'Confirm Changes',
    'applying': 'Applying...',
    'confirm_changes_desc': 'The following changes will be applied to the device:',
    'environmental_conditions': 'Environmental Conditions',
    'target_co2': 'Target CO2',
    'duration': 'Duration',
    'preview': 'Preview',
    'start_process': 'Start Process',
    'starting': 'Starting...',
    'cancel': 'Cancel',
    'final_temperature': 'Final Temperature',
    'estimated_duration': 'Estimated Duration',
    'co2_limit': 'CO2 Limit',
    'process_time': 'Process Time',
    'max_duration': 'Max Duration',
    'cooling_ramp': 'Cooling Ramp',

    // Process List
    'process_tracking': 'Process Tracking',
    'process_tracking_desc': 'Manage active batches, history, and new services.',
    'new_process': 'New Process',
    'filters': 'Filters',
    'in_process': 'IN PROCESS',
    'attention': 'ATTENTION',
    'current_phase': 'Current Phase',
    'estimated_progress': 'Estimated Progress',
    'view_details': 'View Details',
    'start_new_process': 'Start New Process',
    'start_new_process_desc': 'Configure a new batch and assign a maturation recipe.',

    // Create Process Form
    'new_maturation_process': 'New Maturation Process',
    'new_process_desc': 'Enter batch data and configure initial parameters.',
    'client_info': 'Client Information',
    'client_type': 'Client Type',
    'client_name': 'Client Name / Company',
    'batch_details': 'Batch Details',
    'product': 'Product',
    'quantity_kg': 'Quantity (kg)',
    'control_device': 'Control Device',
    'recipe_planning': 'Recipe & Planning',
    'select_recipe_library': 'Select Recipe from Library',
    'create_edit_custom': 'Create/Edit Custom',

    // Users
    'user_management': 'User Management',
    'new_user': 'New User',
    'system_users': 'System Users',
    'user': 'User',
    'email': 'Email',
    'role': 'Role',
    'status': 'Status',
    'actions': 'Actions',
    'edit': 'Edit',
    'active': 'Active',
    'inactive': 'Inactive',

    // Status
    'status_active': 'Active',
    'status_warning': 'Warning',
    'status_alarm': 'Alarm',
    'status_offline': 'Offline',

    // Historical Modal
    'date_range': 'Date Range',
    'data_to_visualize': 'Data to Visualize',
    'generate_chart': 'Generate Chart',
    'temperature': 'Temperature',
    'humidity': 'Humidity',
    'ethylene': 'Ethylene',
    'co2': 'CO2',
    'process_summary': 'Process Summary',
    'viewing_history': 'Viewing History',
    'close': 'Close',
  }
};

const defaultContext: SettingsContextType = {
  language: 'es',
  setLanguage: () => {},
  theme: 'light',
  setTheme: () => {},
  tempUnit: 'C',
  toggleTempUnit: () => {},
  convertTemp: (c) => c,
  formatTemp: (c) => `${c}°C`,
  t: (key) => key,
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');
  const [theme, setThemeState] = useState<Theme>('light');
  const [tempUnit, setTempUnit] = useState<TempUnit>('C');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    const savedTheme = localStorage.getItem('app_theme') as Theme;
    const savedUnit = localStorage.getItem('app_temp_unit') as TempUnit;

    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }

    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       setThemeState('dark');
    }

    if (savedUnit && (savedUnit === 'C' || savedUnit === 'F')) {
      setTempUnit(savedUnit);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('app_theme', newTheme);
  };

  const toggleTempUnit = () => {
    const newUnit = tempUnit === 'C' ? 'F' : 'C';
    setTempUnit(newUnit);
    localStorage.setItem('app_temp_unit', newUnit);
  };

  const convertTemp = (celsius: number): number => {
    if (tempUnit === 'C') return celsius;
    return parseFloat(((celsius * 9/5) + 32).toFixed(1));
  };

  const formatTemp = (celsius: number): string => {
    return `${convertTemp(celsius)}°${tempUnit}`;
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string, replacements?: Record<string, string> | string) => {
    let term = translations[language][key] || key;
    
    if (typeof replacements === 'string') {
        return term === key ? replacements : term;
    }

    if (replacements && typeof replacements === 'object') {
      Object.entries(replacements).forEach(([k, v]) => {
        term = term.replace(`{{${k}}}`, v);
      });
    }
    
    return term;
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, setTheme, tempUnit, toggleTempUnit, convertTemp, formatTemp, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    // Return default context for isolated renders/previews instead of throwing
    return defaultContext;
  }
  return context;
};
