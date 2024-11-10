import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";

interface ListingTabsProps {
  listing: {
    description: string;
    amenities?: string[];
    schedule?: Array<{ day: string; hours: string }>;
  };
}

export function ListingTabs({ listing }: ListingTabsProps) {
  return (
    <Tabs defaultValue="about" className="space-y-6">
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="amenities">Amenities</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="about">
        <Card>
          <CardContent className="p-6">
            <p className="text-white/70 leading-relaxed">
              {listing.description}
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="amenities">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {listing.amenities?.map((amenity, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-white/70"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  {amenity}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {listing.schedule?.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center text-white/70"
                >
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
} 