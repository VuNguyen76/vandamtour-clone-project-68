import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const PreviewModal = ({ isOpen, onClose, title, children }: PreviewModalProps) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  const getViewportWidth = () => {
    switch (viewMode) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Xem trước: {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {/* Viewport controls */}
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="rounded-none px-3"
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="rounded-none px-3"
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="rounded-none px-3"
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          <div 
            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${getViewportClass()}`}
            style={{ width: getViewportWidth() }}
          >
            {children}
          </div>
        </div>
        
        {/* Footer info */}
        <div className="px-6 py-3 bg-gray-50 border-t text-sm text-muted-foreground">
          Chế độ xem: {viewMode === 'desktop' ? 'Desktop' : viewMode === 'tablet' ? 'Tablet' : 'Mobile'} 
          {viewMode !== 'desktop' && ` (${getViewportWidth()})`}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;