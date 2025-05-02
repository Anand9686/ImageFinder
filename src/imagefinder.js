import React, { useState, useEffect } from 'react';
import Button from './components/ui/button'; 
import Card from './components/ui/card';
import CardContent from './components/ui/card';
import axios from 'axios';
import './index.css';  
import './App.css'; 

const TOPICS = ['Travel', 'Cars', 'Wildlife', 'Technology', 'Other'];

function ImageFinder() {
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({ name: '', surname: '', topic: '', customTopic: '' });
  const [searchTopic, setSearchTopic] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (step === 'image' && searchTopic) {
      fetchImage(searchTopic);
    }
  }, [step, searchTopic]);

  const fetchImage = async (topic) => {
    try {
      const res = await axios.get(`https://api.unsplash.com/photos/random`, {
        params: { query: topic },
        headers: {
          Authorization: `Client-ID rNGUJubHP0K9tLImTzbk8A79CmDqS7Anv5LOTAJHd7Q`
        }
      });
      setImage(res.data);
    } catch (err) {
      console.error('Image fetch error:', err);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const topicToSearch = formData.topic === 'Other' ? formData.customTopic : formData.topic;
    setSearchTopic(topicToSearch);
    setStep('image');
  };

  const handleAccept = () => {
    setStep('final');
  };

  const handleReject = () => {
    fetchImage(searchTopic);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {step === 'form' && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label>Name:</label>
            <input
              className="border p-2 w-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Surname:</label>
            <input
              className="border p-2 w-full"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Preferred Topic:</label>
            <select
              className="border p-2 w-full"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            >
              <option value="">Select Topic</option>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          {formData.topic === 'Other' && (
            <div>
              <label>Custom Topic:</label>
              <input
                className="border p-2 w-full"
                value={formData.customTopic}
                onChange={(e) => setFormData({ ...formData, customTopic: e.target.value })}
                required
              />
            </div>
          )}
          <Button type="submit" >Submit</Button>
        </form>
      )}

      {step === 'image' && image && (
          <div className="overflow-hidden w-[10px] h-[20px] mx-auto rounded-xl">
          <img src={image.urls.regular} alt={searchTopic} className="w-full h-full object-cover" />
          <div className="space-x-4">
            <Button type="button" onClick={handleAccept}>Accept</Button>
            <Button type="button" onClick={handleReject} variant="outline">Reject</Button>
          </div>
        </div>
      )}

      {step === 'final' && image && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <div><strong>Name:</strong> {formData.name}</div>
            <div><strong>Surname:</strong> {formData.surname}</div>
            <div>
              <strong>Image:</strong>
              <img src={image.urls.thumb} alt="Selected" className="mt-2 rounded-md" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ImageFinder;
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);