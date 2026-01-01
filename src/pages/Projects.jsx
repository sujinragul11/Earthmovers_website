import React, { useState } from 'react';
import Layout from '../componants/layout/Layout';
import { projects, projectFilters } from '../data/projectsData';
import Modal from '../componants/ui/Modal';
import { FaMapMarkerAlt, FaCalendar, FaTools, FaBuilding, FaRoad, FaIndustry } from 'react-icons/fa';
import { GiDuration } from 'react-icons/gi';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => {
        if (selectedFilter === 'metro') return project.title.toLowerCase().includes('metro');
        if (selectedFilter === 'highway') return project.title.toLowerCase().includes('expressway') || project.title.toLowerCase().includes('road');
        if (selectedFilter === 'industrial') return project.title.toLowerCase().includes('industrial') || project.title.toLowerCase().includes('pharma');
        if (selectedFilter === 'commercial') return project.title.toLowerCase().includes('tech') || project.title.toLowerCase().includes('park');
        if (selectedFilter === 'infrastructure') return project.title.toLowerCase().includes('smart') || project.title.toLowerCase().includes('bridge');
        return true;
      });

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  const getFilterIcon = (filterId) => {
    switch(filterId) {
      case 'metro': return <FaBuilding className="mr-2" />;
      case 'highway': return <FaRoad className="mr-2" />;
      case 'industrial': return <FaIndustry className="mr-2" />;
      default: return <FaBuilding className="mr-2" />;
    }
  };

  return (
    <Layout seoProps={{
      title: "Our Projects - Completed Works Gallery",
      description: "View our completed projects including metro rail, highway construction, industrial estates and commercial developments.",
      keywords: "construction projects, completed works, project gallery, infrastructure projects"
    }}>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our successful earthmoving projects across various sectors and locations
          </p>
        </div>
      </section>

      {/* Project Filters */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Project Portfolio</h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {projectFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getFilterIcon(filter.id)}
                  {filter.name}
                </button>
              ))}
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                <FaBuilding className="text-primary" />
                <span className="font-semibold">{filteredProjects.length} Projects</span>
                <span className="text-gray-500">completed successfully</span>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="card overflow-hidden group cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <div className="text-sm">Click to view details</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-3 text-primary" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="mr-3 text-primary" />
                      <span className="text-sm">{project.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GiDuration className="mr-3 text-primary" />
                      <span className="text-sm">{project.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <FaTools className="mr-2 text-secondary" />
                      <span className="text-sm font-semibold">Equipment Used:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.equipment.slice(0, 3).map((eq, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                        >
                          {eq}
                        </span>
                      ))}
                      {project.equipment.length > 3 && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          +{project.equipment.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-semibold">{project.client}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2">No Projects Found</h3>
              <p className="text-gray-600">No projects match the selected filter. Try another category.</p>
            </div>
          )}

          {/* Project Statistics */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Project Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-gray-600">Metro Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-gray-600">Highway Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">6</div>
                <div className="text-gray-600">Industrial Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-gray-600">Commercial Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={closeProjectModal}
        title={selectedProject?.title}
        size="xlarge"
      >
        {selectedProject && (
          <div>
            {/* Image Gallery */}
            <div className="mb-6 relative">
              <div className="h-96 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg"
                  >
                    →
                  </button>
                  
                  <div className="flex justify-center mt-4 space-x-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                          currentImageIndex === index ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Project Description</h3>
                <p className="text-gray-700 mb-6">
                  {selectedProject.description}
                </p>

                <h3 className="text-xl font-bold mb-4">Equipment Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.equipment.map((eq, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-2 rounded-lg font-medium"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="flex items-center font-medium">
                      <FaMapMarkerAlt className="mr-2 text-primary" />
                      {selectedProject.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Year</div>
                    <div className="flex items-center font-medium">
                      <FaCalendar className="mr-2 text-primary" />
                      {selectedProject.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="flex items-center font-medium">
                      <GiDuration className="mr-2 text-primary" />
                      {selectedProject.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-medium">{selectedProject.client}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Projects;