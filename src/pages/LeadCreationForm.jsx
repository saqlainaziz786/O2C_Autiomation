"use client"

import { useState, useEffect } from "react"

export default function LeadCreationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    linkedinProfile: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    leadSource: "",
    assignOwner: "",
    priorityLevel: "Medium",
    location: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    industry: "",
    companySize: "",
    companyWebsite: "",
    projectedRevenue: "",
    budgetRange: "",
    expectedCloseDate: "",
    icpScore: "",
    leadNotes: "",
    nextSteps: "",
  })

  const [profileImage, setProfileImage] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("New Lead")
  const [selectedQualification, setSelectedQualification] = useState("Qualified")
  const [progress, setProgress] = useState(0)

  const requiredFields = [
    "firstName",
    "lastName",
    "phone",
    "email",
    "leadSource",
    "assignOwner",
    "companyName",
    "industry",
  ]

  useEffect(() => {
    const filledFields = requiredFields.filter((field) => formData[field].trim() !== "").length
    const newProgress = (filledFields / requiredFields.length) * 100
    setProgress(newProgress)
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function getLeadSourceIconClass(source) {
    switch (source) {
      case "LinkedIn": return "fab fa-linkedin";
      case "Facebook": return "fab fa-facebook";
      case "WhatsApp": return "fab fa-whatsapp";
      case "Telegram": return "fab fa-telegram";
      case "Email": return "fas fa-envelope";
      case "Phone": return "fas fa-phone";
      case "Website": return "fas fa-globe";
      case "Referral": return "fas fa-user-friends";
      case "Event": return "fas fa-calendar";
      default: return "";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const missingFields = requiredFields.filter((field) => !formData[field].trim());
    if (missingFields.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare lead object
    const newLead = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      company: formData.companyName,
      companyEmail: formData.companyEmail,
      companyPhone: formData.companyPhone,
      source: {
        type: formData.leadSource,
        iconClass: getLeadSourceIconClass(formData.leadSource), // Save only class name
      },
      industry: formData.industry,
      icpScore: formData.icpScore,
      owner: formData.assignOwner,
      notes: formData.leadNotes,
      status: selectedStatus,
      projectedRevenue: formData.projectedRevenue,
      actualRevenue: "",
      employees: formData.companySize,
      qualification: selectedQualification,
      activityId: "",
      engagement: formData.nextSteps,
      avatar: profileImage,
      location: formData.location,
      companyWebsite: formData.companyWebsite,
    };

    // Save to localStorage
    const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
    localStorage.setItem("leads", JSON.stringify([...savedLeads, newLead]));

    alert("Lead created successfully!");
    window.location.href = "/leads_overview";
  }

  const saveDraft = () => {
    alert("Lead saved as draft!")
    console.log("Draft saved:", { ...formData, selectedStatus, selectedQualification, profileImage })
  }

  const getStepStatus = (stepNumber) => {
    const stepProgress = (stepNumber - 1) * 25
    if (progress > stepProgress + 25) return "completed"
    if (progress > stepProgress) return "active"
    return "inactive"
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Fixed Header */}
      <div className="fixed top-0 left-72 right-3 z-40 bg-white shadow-lg border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left Section */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              {/* Back Button */}
              <button
                onClick={() => window.history.back()}
                className="bg-blue-600 text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <i className="fas fa-arrow-left text-sm sm:text-lg"></i>
              </button>

              {/* Title */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <i className="fas fa-user-plus text-white text-sm sm:text-xl"></i>
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Add New Lead</h1>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold">Create a new lead profile</p>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                <span className="text-blue-800 font-semibold text-xs sm:text-sm">
                  Progress: <span>{Math.round(progress)}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="pt-24 sm:pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-white text-center relative overflow-hidden transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-rocket text-4xl sm:text-6xl mr-4"></i>
                <div className="text-left">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-2">Welcome to Lead Creation!</h2>
                  <p className="text-sm sm:text-lg opacity-90">Let's add a new potential customer to your pipeline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${getStepStatus(step) === "completed"
                    ? "bg-green-500 text-white"
                    : getStepStatus(step) === "active"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600"
                    }`}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${getStepStatus(step + 1) === "completed" || getStepStatus(step + 1) === "active"
                      ? "bg-green-500"
                      : "bg-gray-300"
                      }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Form Completion</h3>
              <span className="text-blue-600 font-semibold text-sm sm:text-base">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2 sm:h-3">
              <div
                className="bg-gradient-to-r from-blue-700 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Profile Section */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <i className="fas fa-user-circle text-white text-lg sm:text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Profile Information</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Upload photo and basic personal details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
                {/* Profile Picture */}
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-500 cursor-pointer transition-all duration-300 hover:border-blue-700 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-500">
                        <i className="fas fa-camera text-2xl sm:text-3xl mb-2"></i>
                        <span className="text-xs sm:text-sm font-semibold">Add Photo</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-semibold"
                  >
                    <i className="fas fa-upload mr-2"></i>
                    Upload Photo
                  </button>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">First Name *</label>
                    <div className="relative">
                      <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Last Name *</label>
                    <div className="relative">
                      <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Job Title</label>
                    <div className="relative">
                      <i className="fas fa-briefcase absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                        placeholder="Enter job title"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Department</label>
                    <div className="relative">
                      <i className="fas fa-sitemap absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      >
                        <option value="">Select Department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <i className="fab fa-linkedin absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                      <input
                        type="url"
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Date of Birth</label>
                    <div className="relative">
                      <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <i className="fas fa-address-card text-white text-lg sm:text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Contact Information</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Essential contact details and lead source</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Lead Phone *</label>
                  <div className="relative">
                    <i className="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Lead Email *</label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Lead Source *</label>
                  <div className="relative">
                    <i className="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <select
                      name="leadSource"
                      value={formData.leadSource}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Source</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Telegram">Telegram</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Assign Owner *</label>
                  <div className="relative">
                    <i className="fas fa-user-tie absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <select
                      name="assignOwner"
                      value={formData.assignOwner}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Owner</option>
                      <option value="Sarah Wilson">Sarah Wilson</option>
                      <option value="John Davis">John Davis</option>
                      <option value="Emily Rodriguez">Emily Rodriguez</option>
                      <option value="Michael Brown">Michael Brown</option>
                      <option value="Lisa Anderson">Lisa Anderson</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Priority Level</label>
                  <div className="relative">
                    <i className="fas fa-flag absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <select
                      name="priorityLevel"
                      value={formData.priorityLevel}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Low">Low Priority</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Location</label>
                  <div className="relative">
                    <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-700 to-blue-800 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <i className="fas fa-building text-white text-lg sm:text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Company Information</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Business details and company data</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Company Name *</label>
                  <div className="relative">
                    <i className="fas fa-building absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Company Email</label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter company email"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Company Phone</label>
                  <div className="relative">
                    <i className="fas fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="tel"
                      name="companyPhone"
                      value={formData.companyPhone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter company phone"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Industry *</label>
                  <div className="relative">
                    <i className="fas fa-industry absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Company Size</label>
                  <div className="relative">
                    <i className="fas fa-users absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="">Select Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-25">11-25 employees</option>
                      <option value="25-50">25-50 employees</option>
                      <option value="50-100">50-100 employees</option>
                      <option value="100-250">100-250 employees</option>
                      <option value="250-500">250-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Company Website</label>
                  <div className="relative">
                    <i className="fas fa-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue & Status Section */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <i className="fas fa-chart-line text-white text-lg sm:text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Revenue & Status</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    Financial projections and lead qualification
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">
                    Projected Revenue
                  </label>
                  <div className="relative">
                    <i className="fas fa-dollar-sign absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="number"
                      name="projectedRevenue"
                      value={formData.projectedRevenue}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Budget Range</label>
                  <div className="relative">
                    <i className="fas fa-money-bill-wave absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="">Select Budget</option>
                      <option value="Under $10K">Under $10K</option>
                      <option value="$10K - $50K">$10K - $50K</option>
                      <option value="$50K - $100K">$50K - $100K</option>
                      <option value="$100K - $500K">$100K - $500K</option>
                      <option value="$500K+">$500K+</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">
                    Expected Close Date
                  </label>
                  <div className="relative">
                    <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="date"
                      name="expectedCloseDate"
                      value={formData.expectedCloseDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">ICP Score</label>
                  <div className="relative">
                    <i className="fas fa-star absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="icpScore"
                      value={formData.icpScore}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm sm:text-base"
                      placeholder="0-100"
                    />
                  </div>
                </div>
              </div>

              {/* Status Selection */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-blue-800 font-semibold mb-4 text-sm sm:text-base">
                  Initial Lead Status
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { name: "New Lead", icon: "fas fa-user-plus", color: "bg-blue-500", active: "bg-blue-700" },
                    { name: "Contacted", icon: "fas fa-phone", color: "bg-blue-400", active: "bg-blue-600" },
                    { name: "Qualified", icon: "fas fa-handshake", color: "bg-blue-600", active: "bg-green-600" },
                    { name: "Follow-up", icon: "fas fa-clock", color: "bg-blue-300", active: "bg-yellow-500" },
                  ].map((status) => (
                    <button
                      key={status.name}
                      type="button"
                      onClick={() => setSelectedStatus(status.name)}
                      className={`flex items-center justify-center px-4 py-3 rounded-full text-white font-semibold text-xs sm:text-sm transition-all duration-300
          ${selectedStatus === status.name
            ? `${status.active} ring-4 ring-white shadow-lg scale-105`
            : `${status.color} hover:scale-105`
          }`}
                    >
                      <i className={`${status.icon} mr-2`}></i>
                      {status.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qualification Selection */}
              <div>
                <label className="block text-blue-800 font-semibold mb-4 text-sm sm:text-base">
                  Lead Qualification
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {[
                    { name: "Qualified", icon: "fas fa-star", color: "bg-blue-600", active: "bg-green-600" },
                    { name: "Hot Lead", icon: "fas fa-fire", color: "bg-blue-700", active: "bg-red-600" },
                    { name: "Warm Lead", icon: "fas fa-thermometer-half", color: "bg-blue-500", active: "bg-yellow-500" },
                    { name: "Cold Lead", icon: "fas fa-snowflake", color: "bg-blue-400", active: "bg-blue-900" },
                    { name: "Unqualified", icon: "fas fa-question", color: "bg-blue-300", active: "bg-gray-500" },
                  ].map((qual) => (
                    <button
                      key={qual.name}
                      type="button"
                      onClick={() => setSelectedQualification(qual.name)}
                      className={`flex items-center justify-center px-3 py-2 rounded-full text-white font-semibold text-xs sm:text-sm transition-all duration-300
          ${selectedQualification === qual.name
            ? `${qual.active} ring-4 ring-white shadow-lg scale-105`
            : `${qual.color} hover:scale-105`
          }`}
                    >
                      <i className={`${qual.icon} mr-1 sm:mr-2`}></i>
                      {qual.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-sky-500 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-4 sm:mr-6">
                  <i className="fas fa-sticky-note text-white text-lg sm:text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-800">Notes & Additional Info</h2>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">Important observations and next steps</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Lead Notes</label>
                  <textarea
                    name="leadNotes"
                    value={formData.leadNotes}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 h-24 sm:h-32 resize-none text-sm sm:text-base"
                    placeholder="Enter detailed notes about the lead, their interests, pain points, and any important information..."
                  ></textarea>
                </div>

                <div className="relative">
                  <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Next Steps</label>
                  <textarea
                    name="nextSteps"
                    value={formData.nextSteps}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 h-24 sm:h-32 resize-none text-sm sm:text-base"
                    placeholder="Outline the next actions to take with this lead..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-6 sm:pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <i className="fas fa-plus mr-2 sm:mr-3"></i>
                Create Lead
              </button>
              <button
                type="button"
                onClick={saveDraft}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold text-sm sm:text-lg transform hover:-translate-y-1 hover:shadow-xl"
              >
                <i className="fas fa-save mr-2 sm:mr-3"></i>
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <i className="fas fa-times mr-2 sm:mr-3"></i>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

