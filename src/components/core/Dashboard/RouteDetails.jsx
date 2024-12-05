import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteDetailsCreation } from "../../../services/oparations/CompanyAPI";
import { useDispatch } from "react-redux";
const RouteDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const deliveryDetails = location.state?.deliveriesDetails || {};
  const deliveryRoutes = location.state?.routes || [];
  const routeTrackingid = deliveryDetails[0]?.routeTrackingid || null;
  const deliverID = deliveryDetails[0]?._id;

  const [routeDetails, setRouteDetails] = useState(
    deliveryRoutes.map((route) => ({
      ...route,
      trackingDetails: routeTrackingid?.[route.step] || {}, // Preload tracking details if available
      isCompleted: !!routeTrackingid?.[route.step], // Mark completed if details exist
    }))
  );

  const [modifiedStepIndex, setModifiedStepIndex] = useState(null); // Track the modified step

  const handleInputChange = (stepIndex, field, value) => {
    const updatedDetails = [...routeDetails];
    if (!updatedDetails[stepIndex].trackingDetails) {
      updatedDetails[stepIndex].trackingDetails = {};
    }
    updatedDetails[stepIndex].trackingDetails[field] = value;
    setRouteDetails(updatedDetails);
    setModifiedStepIndex(stepIndex); // Mark the step as modified
  };

  const markStepCompleted = (stepIndex) => {
    const updatedDetails = [...routeDetails];
    updatedDetails[stepIndex].isCompleted = true;
    setRouteDetails(updatedDetails);
    setModifiedStepIndex(stepIndex); // Mark the step as modified
  };

  const saveRouteDetails = async () => {
    if (modifiedStepIndex === null) {
      console.log("No changes to save.");
      return;
    }

    // Prepare data for the modified step only
    const modifiedStep = routeDetails[modifiedStepIndex];
    const dataToSend = {
      deliveryId: deliverID,
      from: modifiedStep.from,
      to: modifiedStep.to,
      status: modifiedStep.isCompleted ? "true" : "false",
      ...(modifiedStep.trackingDetails || {}),
    };

    console.log("Sending data to backend:", dataToSend);

    // Send the data to the backend
    await dispatch(RouteDetailsCreation(dataToSend));
    navigate(-1)
  };

  return (
    <div className="px-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Route Details for the Order
      </h1>
      <div className="space-y-8">
        {routeDetails.length === 0 ? (
          <p className="text-center text-gray-500">No delivery routes available.</p>
        ) : (
          routeDetails.map((step, index) => (
            <div
              key={index}
              className={`border border-gray-300 shadow-lg rounded-lg p-2 bg-white ${
                step.isCompleted ? "opacity-75 cursor-not-allowed" : "hover:shadow-xl"
              } transition-shadow duration-300`}
            >
              <p className="ml-4 text-xl font-semibold mb-1 text-gray-800">
                Step {step.step + 1} :
              </p>
              <div className="flex flex-row ml-4 gap-x-2 justify-between items-center">
                <div>
                  <p className="text-gray-600">
                    <strong>From:</strong> {step.from}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>To:</strong> {step.to}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>By:</strong> {step.by}
                  </p>
                </div>
                <button
                  onClick={() => markStepCompleted(index)}
                  className={`w-1/3 mx-4 bg-blu text-white py-2 px-4 rounded-lg hover:bg-dblue transition-all duration-300 ${
                    step.isCompleted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={step.isCompleted}
                >
                  {step.isCompleted ? "Step Completed" : "Mark as Completed"}
                </button>
              </div>
              <div className="mt-2">
                {/* Conditional Fields */}
                {step.by === "road" && (
                  <div className="mb-4 mx-4">
                    <label className="block text-gray-700">Assign Driver</label>
                    <input
                      type="text"
                      value={step.trackingDetails?.driver || ""}
                      disabled={step.isCompleted}
                      onChange={(e) =>
                        handleInputChange(index, "driver", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter driver's name"
                    />
                  </div>
                )}
                {step.by === "rail" && (
                  <div className="mb-4 mx-4">
                    <label className="block text-gray-700">Train FNR Number</label>
                    <input
                      type="text"
                      value={step.trackingDetails?.fnrnumber || ""}
                      disabled={step.isCompleted}
                      onChange={(e) =>
                        handleInputChange(index, "fnrnumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter FNR number"
                    />
                  </div>
                )}
                {step.by === "air" && (
                  <div className="mb-4 mx-4">
                    <label className="block text-gray-700">Flight AWB Number</label>
                    <input
                      type="text"
                      value={step.trackingDetails?.awbnumber || ""}
                      disabled={step.isCompleted}
                      onChange={(e) =>
                        handleInputChange(index, "awbnumber", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter AWB number"
                    />
                  </div>
                )}
                {step.by === "port" && (
                  <>
                    <div className="mb-4 mx-4">
                      <label className="block text-gray-700">Interface Name</label>
                      <input
                        type="text"
                        value={step.trackingDetails?.interfaceName || ""}
                        disabled={step.isCompleted}
                        onChange={(e) =>
                          handleInputChange(index, "interfaceName", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Interface Name"
                      />
                    </div>
                    <div className="mb-4 mx-4">
                      <label className="block text-gray-700">IGM Number</label>
                      <input
                        type="text"
                        value={step.trackingDetails?.igmNumber || ""}
                        disabled={step.isCompleted}
                        onChange={(e) =>
                          handleInputChange(index, "igmNumber", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter IGM Number"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {routeDetails.length > 0 && (
        <button
          onClick={saveRouteDetails}
          className="w-full mt-4 bg-blu text-white py-2 px-6 rounded-lg hover:bg-dblue transition-all duration-300"
        >
          Save Route Details
        </button>
      )}
    </div>
  );
};

export default RouteDetails;
