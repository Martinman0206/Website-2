
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const initialAchievements = [
  {
    title: "Graduated with Honors",
    description: "Completed my degree in Computer Science with distinction.",
    image: "/images/graduation.jpg",
  },
  {
    title: "Developed a Mobile App",
    description: "Created a fitness tracker app with over 10,000 downloads.",
    image: "/images/app.jpg",
  },
  {
    title: "Spoke at Tech Conference",
    description: "Presented on AI and Machine Learning trends in 2024.",
    image: "/images/conference.jpg",
  },
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [note, setNote] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleNoteChange = (e) => setNote(e.target.value);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNote = () => {
    if (note.trim()) {
      const newEntry = {
        title: "New Note",
        description: note,
        image: imagePreview,
      };
      setAchievements([newEntry, ...achievements]);
      setNote("");
      setUploadedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Personal Achievements
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achieve, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <Card className="rounded-2xl shadow-md overflow-hidden">
                {achieve.image && (
                  <img
                    src={achieve.image}
                    alt={achieve.title}
                    className="object-cover w-full h-48"
                  />
                )}
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{achieve.title}</h2>
                  <p className="text-gray-700">{achieve.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Add Background Notes with Image</h2>
          <Textarea
            placeholder="Write your personal reflections, thoughts, or notes here..."
            value={note}
            onChange={handleNoteChange}
            className="min-h-[150px] mb-4"
          />
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 rounded-xl shadow-md"
              style={{ width: 300, height: 200 }}
            />
          )}
          <div className="mt-4">
            <Button onClick={handleAddNote}>Add Note</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
