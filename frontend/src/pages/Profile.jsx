import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Loader from "../components/Loader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Camera } from "lucide-react";
import { API_URL } from "../utils";

export default function Profile() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState({ name: "", bio: "", phone: "", photo: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isLoaded && user) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/profile/${user.id}`);
          setProfile({
            name: res.data.name || "",
            bio: res.data.bio || "",
            phone: res.data.phone || "",
            photo: res.data.photo || ""
          });
        } catch (error) {
          if (error.response && error.response.status !== 404) {
            console.error(error);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [isLoaded, user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("clerkUserId", user.id);
      formData.append("email", user.primaryEmailAddress.emailAddress);
      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      formData.append("phone", profile.phone);
      if (profile.photo) formData.append("photo", profile.photo); // URL case
      if (photoFile) formData.append("photo", photoFile); // File upload case

      const res = await axios.post(`${API_URL}/api/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setProfile({
        name: res.data.name || "",
        bio: res.data.bio || "",
        phone: res.data.phone || "",
        photo: res.data.photo || ""
      });
      setPhotoFile(null);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded || loading) return <Loader />;

  const displayPhoto = photoFile ? URL.createObjectURL(photoFile) : (profile.photo || user.imageUrl);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>Update your personal information and profile picture.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 mb-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg group-hover:opacity-75 transition-opacity">
                <img src={displayPhoto} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground">Click image to upload new photo</p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.primaryEmailAddress.emailAddress} disabled className="bg-muted" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleChange} placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" name="bio" value={profile.bio} onChange={handleChange} placeholder="Tell us about yourself" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={profile.phone} onChange={handleChange} placeholder="+1 234 567 890" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photoUrl">Or use Photo URL</Label>
              <Input id="photoUrl" name="photo" value={profile.photo} onChange={handleChange} placeholder="https://example.com/photo.jpg" disabled={!!photoFile} />
            </div>
            
            <Button onClick={handleSave} disabled={saving} className="w-full mt-4">
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
