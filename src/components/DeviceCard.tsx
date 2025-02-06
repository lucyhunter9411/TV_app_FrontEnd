import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DeviceCardProps {
  deviceId: string;
  isActive: boolean;
  status: string;
  url?: string;
  onToggleActive: () => void;
  onUpdateUrl: (url: string) => void;
}

const DeviceCard = ({ 
  deviceId, 
  isActive, 
  status, 
  url = '', 
  onToggleActive, 
  onUpdateUrl 
}: DeviceCardProps) => {
  const [urlInput, setUrlInput] = useState(url);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-gray-500';
      case 'error':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>TV {deviceId}</CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.toUpperCase()}
          </Badge>
        </div>
        <CardDescription>
          Status: {isActive ? 'Active' : 'Inactive'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <Button 
            onClick={() => onUpdateUrl(urlInput)}
            variant="outline"
          >
            Set
          </Button>
        </div>
        <Button 
          onClick={onToggleActive}
          variant={isActive ? "destructive" : "default"}
          className="w-full"
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeviceCard; 