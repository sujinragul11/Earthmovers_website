import React, { useState } from 'react';
import Layout from '../componants/layout/Layout';
import { projects, projectFilters } from '../data/projectsData';
import Modal from '../componants/ui/Modal';
import { FaMapMarkerAlt, FaCalendar, FaTools, FaMountain, FaHardHat, FaIndustry, FaWater } from 'react-icons/fa';
import { GiDuration, GiMineTruck } from 'react-icons/gi';
import { RiBuildingLine } from 'react-icons/ri';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => {
        if (selectedFilter === 'excavation') return project.title.toLowerCase().includes('excavation');
        if (selectedFilter === 'demolition') return project.title.toLowerCase().includes('demolition');
        if (selectedFilter === 'mining') return project.title.toLowerCase().includes('mining');
        if (selectedFilter === 'infrastructure') return project.title.toLowerCase().includes('infrastructure');
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
      case 'mining': return <GiMineTruck className="mr-2" />;
      case 'excavation': return <FaMountain className="mr-2" />;
      case 'demolition': return <FaHardHat className="mr-2" />;
      case 'infrastructure': return <RiBuildingLine className="mr-2" />;
      default: return <FaIndustry className="mr-2" />;
    }
  };

  return (
    <Layout seoProps={{
      title: "Our Projects - Earthmoving & Excavation Works",
      description: "View our completed earthmoving projects including mining, excavation, demolition and infrastructure development.",
      keywords: "earthmoving projects, excavation works, mining projects, demolition projects"
    }}>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our expertise in earthmoving, mining, excavation and infrastructure projects
          </p>
        </div>
      </section>

      {/* Project Filters */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Project Portfolio</h2>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {projectFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-200 shadow'
                  }`}
                >
                  {getFilterIcon(filter.id)}
                  {filter.name}
                </button>
              ))}
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <FaIndustry className="text-blue-600" />
                <span className="font-semibold text-blue-700">{filteredProjects.length} Projects</span>
                <span className="text-gray-600">completed successfully</span>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer border border-gray-200"
                onClick={() => openProjectModal(project)}
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <div className="text-sm font-medium">Click to view details</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-3 text-blue-500" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="mr-3 text-blue-500" />
                      <span className="text-sm">{project.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GiDuration className="mr-3 text-blue-500" />
                      <span className="text-sm">{project.duration}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <FaTools className="mr-2 text-orange-500" />
                      <span className="text-sm font-semibold text-gray-700">Equipment Used:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.equipment.slice(0, 3).map((eq, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100"
                        >
                          {eq}
                        </span>
                      ))}
                      {project.equipment.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{project.equipment.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-semibold text-gray-800">{project.client}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-200">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">No Projects Found</h3>
              <p className="text-gray-600">No projects match the selected filter. Try another category.</p>
            </div>
          )}

          {/* Project Statistics */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-100 shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Project Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5</div>
                <div className="text-gray-700">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2</div>
                <div className="text-gray-700">Mining Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2</div>
                <div className="text-gray-700">Excavation Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1</div>
                <div className="text-gray-700">Demolition Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">1</div>
                <div className="text-gray-700">Infrastructure</div>
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    →
                  </button>
                  
                  <div className="flex justify-center mt-4 space-x-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
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
                <h3 className="text-xl font-bold mb-4 text-gray-800">Project Description</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <h3 className="text-xl font-bold mb-4 text-gray-800">Equipment Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.equipment.map((eq, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium border border-blue-100"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="flex items-center font-medium text-gray-800">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      {selectedProject.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Year</div>
                    <div className="flex items-center font-medium text-gray-800">
                      <FaCalendar className="mr-2 text-blue-500" />
                      {selectedProject.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="flex items-center font-medium text-gray-800">
                      <GiDuration className="mr-2 text-blue-500" />
                      {selectedProject.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-medium text-gray-800">{selectedProject.client}</div>
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