import axios from 'axios';

const API_URL = 'https://app-sparc-dev-wus-001.azurewebsites.net/api/devices/';

export interface Device {
  id: number;
  device_id: string;
  is_active: boolean;
  status: 'online' | 'offline' | 'error' | 'maintenance';
  url?: string;
}

export const getDevices = async (token: string): Promise<Device[]> => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createDevice = async (deviceId: string, token: string): Promise<Device> => {
  const response = await axios.post(API_URL, 
    { device_id: deviceId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const toggleDevice = async (deviceId: string, token: string): Promise<void> => {
  await axios.put(`${API_URL}toggle/${deviceId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateDeviceUrl = async (deviceId: string, url: string, token: string): Promise<Device> => {
  const response = await axios.put(`${API_URL}url/${deviceId}`, 
    { url },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
}; 