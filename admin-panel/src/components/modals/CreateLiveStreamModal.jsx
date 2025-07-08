import React, { useState } from 'react';
import { X, Video, Youtube, Facebook, Twitch, Radio, Calendar, Clock, Globe, Settings, Eye } from 'lucide-react';
import { FormDrawer } from '../IntegratedDrawer';

const platforms = [
  { 
    id: 'youtube', 
    name: 'YouTube Live', 
    icon: Youtube, 
    color: 'border-red-200 bg-red-50 text-red-700',
    description: 'Stream to your YouTube channel with automatic recording',
    features: ['Auto-recording', 'Chat integration', 'Analytics', 'Monetization']
  },
  { 
    id: 'facebook', 
    name: 'Facebook Live', 
    icon: Facebook, 
    color: 'border-blue-200 bg-blue-50 text-blue-700',
    description: 'Broadcast to your Facebook page and reach your followers',
    features: ['Social sharing', 'Comments integration', 'Event promotion', 'Audience insights']
  },
  { 
    id: 'twitch', 
    name: 'Twitch', 
    icon: Twitch, 
    color: 'border-purple-200 bg-purple-50 text-purple-700',
    description: 'Stream to the Twitch gaming and creative community',
    features: ['Interactive chat', 'Subscriber features', 'VOD archive', 'Clips creation']
  },
  { 
    id: 'custom', 
    name: 'Custom RTMP', 
    icon: Radio, 
    color: 'border-gray-200 bg-gray-50 text-gray-700',
    description: 'Use your own streaming setup with RTMP protocol',
    features: ['Full control', 'Custom overlays', 'Multi-platform', 'Professional tools']
  }
];

const streamTypes = [
  { id: 'town-hall', name: 'Town Hall Meeting', description: 'Community discussion and Q&A session' },
  { id: 'parliamentary', name: 'Parliamentary Session', description: 'Live coverage of parliamentary proceedings' },
  { id: 'press-conference', name: 'Press Conference', description: 'Official announcements and media briefings' },
  { id: 'rally', name: 'Political Rally', description: 'Campaign events and public speeches' },
  { id: 'educational', name: 'Educational Session', description: 'Policy explanations and civic education' },
  { id: 'radio-show', name: 'Radio Show', description: 'Regular radio programming and talk shows' },
  { id: 'other', name: 'Other', description: 'Custom event type' }
];

export function CreateLiveStreamModal({ isOpen, onClose, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    platform: '',
    scheduledFor: '',
    scheduledTime: '',
    isScheduled: false,
    privacy: 'public',
    enableChat: true,
    enableRecording: true,
    autoStartRecording: true,
    maxViewers: '',
    thumbnailUrl: '',
    tags: [],
    customRtmpUrl: '',
    customStreamKey: ''
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.type) newErrors.type = 'Stream type is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
    }
    
    if (step === 2) {
      if (!formData.platform) newErrors.platform = 'Platform is required';
      if (formData.platform === 'custom') {
        if (!formData.customRtmpUrl.trim()) newErrors.customRtmpUrl = 'RTMP URL is required';
        if (!formData.customStreamKey.trim()) newErrors.customStreamKey = 'Stream key is required';
      }
    }

    if (step === 3 && formData.isScheduled) {
      if (!formData.scheduledFor) newErrors.scheduledFor = 'Date is required';
      if (!formData.scheduledTime) newErrors.scheduledTime = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      const newStream = {
        id: Date.now(),
        ...formData,
        status: formData.isScheduled ? 'scheduled' : 'ready',
        createdAt: new Date().toISOString(),
        streamUrl: formData.platform === 'custom' ? formData.customRtmpUrl : null,
        streamKey: formData.platform === 'custom' ? formData.customStreamKey : `${formData.platform}_${Date.now()}`
      };

      onSave(newStream);
      setFormData({
        title: '',
        description: '',
        type: '',
        platform: '',
        scheduledFor: '',
        scheduledTime: '',
        isScheduled: false,
        privacy: 'public',
        enableChat: true,
        enableRecording: true,
        autoStartRecording: true,
        maxViewers: '',
        thumbnailUrl: '',
        tags: [],
        customRtmpUrl: '',
        customStreamKey: ''
      });
      setCurrentStep(1);
      onClose();
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stream Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter stream title..."
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {streamTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData('type', type.id)}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    formData.type === type.id
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{type.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{type.description}</div>
                </button>
              ))}
            </div>
            {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe what this stream will cover..."
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Selection</h3>
        
        <div className="space-y-3">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => updateFormData('platform', platform.id)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  formData.platform === platform.id
                    ? platform.color
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={24} />
                  <div className="flex-1">
                    <div className="font-semibold">{platform.name}</div>
                    <div className="text-sm opacity-75 mt-1">{platform.description}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {platform.features.map((feature, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-white/50 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {errors.platform && <p className="text-red-600 text-sm mt-1">{errors.platform}</p>}

        {formData.platform === 'custom' && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <h4 className="font-medium text-gray-900">Custom RTMP Configuration</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RTMP URL *
              </label>
              <input
                type="url"
                value={formData.customRtmpUrl}
                onChange={(e) => updateFormData('customRtmpUrl', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.customRtmpUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="rtmp://your-server.com/live"
              />
              {errors.customRtmpUrl && <p className="text-red-600 text-sm mt-1">{errors.customRtmpUrl}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stream Key *
              </label>
              <input
                type="text"
                value={formData.customStreamKey}
                onChange={(e) => updateFormData('customStreamKey', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.customStreamKey ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your stream key..."
              />
              {errors.customStreamKey && <p className="text-red-600 text-sm mt-1">{errors.customStreamKey}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stream Settings</h3>
        
        <div className="space-y-6">
          {/* Scheduling */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="isScheduled"
                checked={formData.isScheduled}
                onChange={(e) => updateFormData('isScheduled', e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="isScheduled" className="font-medium text-gray-700">
                Schedule for later
              </label>
            </div>
            
            {formData.isScheduled && (
              <div className="grid grid-cols-2 gap-4 ml-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledFor}
                    onChange={(e) => updateFormData('scheduledFor', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.scheduledFor ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.scheduledFor && <p className="text-red-600 text-sm mt-1">{errors.scheduledFor}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => updateFormData('scheduledTime', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.scheduledTime ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.scheduledTime && <p className="text-red-600 text-sm mt-1">{errors.scheduledTime}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Privacy Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Privacy Setting
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'public', name: 'Public', description: 'Anyone can view' },
                { id: 'unlisted', name: 'Unlisted', description: 'Only with link' },
                { id: 'private', name: 'Private', description: 'Invited only' }
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateFormData('privacy', option.id)}
                  className={`p-3 text-center border rounded-lg transition-colors ${
                    formData.privacy === option.id
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{option.name}</div>
                  <div className="text-xs opacity-75 mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Features</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-900">Enable Chat</div>
                  <div className="text-xs text-gray-500">Allow viewers to chat during the stream</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableChat}
                  onChange={(e) => updateFormData('enableChat', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-900">Record Stream</div>
                  <div className="text-xs text-gray-500">Save recording for later viewing</div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enableRecording}
                  onChange={(e) => updateFormData('enableRecording', e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
              </div>
              
              {formData.enableRecording && (
                <div className="flex items-center justify-between ml-4">
                  <div>
                    <div className="font-medium text-sm text-gray-900">Auto-start Recording</div>
                    <div className="text-xs text-gray-500">Start recording when stream begins</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoStartRecording}
                    onChange={(e) => updateFormData('autoStartRecording', e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Stream Details', component: renderStep1 },
    { number: 2, title: 'Platform', component: renderStep2 },
    { number: 3, title: 'Settings', component: renderStep3 }
  ];

  return (
    <FormDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Create Live Stream"
      icon={Video}
      width="w-[700px]"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <div className="ml-2 text-sm font-medium text-gray-900">
                {step.title}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-px mx-4 ${
                  currentStep > step.number ? 'bg-red-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        {steps.find(step => step.number === currentStep)?.component()}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            Back
          </button>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Create Stream
              </button>
            )}
          </div>
        </div>
      </form>
    </FormDrawer>
  );
}