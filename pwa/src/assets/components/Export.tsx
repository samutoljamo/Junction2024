// Export.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockItems } from './mockData'; // Import mock data directly for testing

const Export = () => {
  const navigate = useNavigate();

  const convertToCSV = (data: any[]) => {
    const equipmentHeaders = [
      'ID',
      'Equipment Name',
      'X',
      'Y',
      'Floor',
      'Manufacturer',
      'Model',
      'Serial Number',
      'Equipment Type',
      'Size',
      'Material',
      'Manufacturing Year'
    ];
    
    const visitHeaders = [
      'Visit Condition',
      'Visit Notes',
      'Visit Date',
      'Surveyor'
    ];
    
    const headers = [...equipmentHeaders, ...visitHeaders];
    
    const rows = data.flatMap(item => {
      if (!item.visits || item.visits.length === 0) {
        return [
          [
            item.id,
            item.equipmentName,
            item.x,
            item.y,
            item.floor,
            item.manufacturer || '',
            item.model || '',
            item.serialNumber || '',
            item.equipmentType || '',
            item.size || '',
            item.material || '',
            item.manufacturingYear || '',
            '',
            '',
            '',
            ''
          ].map(cell => `"${cell}"`).join(',')
        ];
      }
      
      return item.visits.map(visit => [
        item.id,
        item.equipmentName,
        item.x,
        item.y,
        item.floor,
        item.manufacturer || '',
        item.model || '',
        item.serialNumber || '',
        item.equipmentType || '',
        item.size || '',
        item.material || '',
        item.manufacturingYear || '',
        visit.condition,
        visit.notes,
        visit.createdAt,
        visit.surveyor
      ].map(cell => `"${cell}"`).join(','));
    });
    
    return [headers.join(','), ...rows].join('\n');
  };

  useEffect(() => {
    // Use mock data directly instead of Redux store
    const csv = convertToCSV(mockItems);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `equipment_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    navigate('/');
  }, [navigate]);

  return null;
};

export default Export;
