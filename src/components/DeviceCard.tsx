import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SuccessIcon from "@/utils/icons/Success";
import CancelIcon from "@/utils/icons/Cancel";
import EditIcon from "@/utils/icons/Edit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Edit } from "lucide-react";

interface DeviceCardProps {
  deviceId: string;
  isActive: boolean;
  status: string;
  url?: string;
  name?: string;
  onToggleActive: () => void;
  onUpdateUrl: (url: string) => void;
  onUpdateName: (url: string) => void;
}

const DeviceCard = ({
  deviceId,
  isActive,
  status,
  name,
  url = '',
  onToggleActive,
  onUpdateUrl,
  onUpdateName,
}: DeviceCardProps) => {
  const [urlInput, setUrlInput] = useState(url);
  const [title, setTitle] = useState(name);
  const [edit, setEdit] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null); // Create a ref for the title

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
          <CardTitle>
            <div className="flex items-center">
              <input
                ref={titleRef} // Attach the ref to the input
                className="border-none outline-none font-bold p-0 text-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={!edit}
              />
              {edit ? (
                <>
                  <span className="ml-2 cursor-pointer" onClick={() => { onUpdateName(title); setEdit(false) }}>
                    <SuccessIcon />
                  </span>
                  <span className="ml-2 cursor-pointer" onClick={() => { setTitle(name); setEdit(false) }}>
                    <CancelIcon />
                  </span>
                </>
              ) : (
                <span className="ml-2 cursor-pointer" onClick={() => { setEdit(true); titleRef.current.focus(); }}>
                  <EditIcon />
                </span>
              )}
            </div>
          </CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.toUpperCase()}
          </Badge>
        </div>
        <CardDescription>
          <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
          <p>Device ID: {deviceId}</p>
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