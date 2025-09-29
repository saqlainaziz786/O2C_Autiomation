"use client"

import { useState } from "react"

export default function DeleteConfirmationModal({ lead, onClose, onConfirmDelete }) {
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [notification, setNotification] = useState(null)

    const toggleConfirmation = () => {
        setIsConfirmed(!isConfirmed)
    }

    const confirmDelete = () => {
        if (!isConfirmed) return

        setIsDeleting(true)
        setProgress(0)

        // Simulate deletion progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 15
                if (newProgress >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        showNotification("Lead deleted successfully!", "success")
                        setTimeout(() => {
                            onConfirmDelete(lead.id)
                        }, 2000)
                    }, 500)
                    return 100
                }
                return newProgress
            })
        }, 200)
    }

    const cancelDelete = () => {
        onClose()
    }

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 3000)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-lg w-full mx-4 p-6 relative shadow-2xl transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                    <i className="fas fa-times text-sm"></i>
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-lg">
                        <i className="fas fa-trash-alt"></i>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Delete Lead Confirmation</h1>
                    <p className="text-sm text-gray-600">
                        This action cannot be undone. Please review the details carefully.
                    </p>
                </div>

                {/* Lead Information Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-4 mb-4">
                        <img
                            src={
                                lead.avatar ||
                                ""
                            }
                            alt="Lead Avatar"
                            className="w-12 h-12 rounded-full border-2 border-blue-400"
                        />
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-800 mb-1">{lead.name}</h2>
                            <p className="text-sm text-blue-600 font-semibold mb-1">ID: {lead.id}</p>
                            <p className="text-xs text-gray-600">
                                {lead.company} • {lead.industry}
                            </p>
                        </div>
                        <div className="text-right">
                            <div
                                className={`text-white px-2 py-1 rounded-full text-xs font-bold mb-1 flex items-center ${
                                    lead.status === "Approved"
                                        ? "bg-green-500"
                                        : lead.status === "Pending"
                                        ? "bg-yellow-500"
                                        : lead.status === "Rejected"
                                        ? "bg-red-500"
                                        : "bg-blue-500"
                                }`}
                            >
                                <i
                                    className={`fas ${
                                        lead.status === "Approved"
                                            ? "fa-check-circle"
                                            : lead.status === "Pending"
                                            ? "fa-clock"
                                            : lead.status === "Rejected"
                                            ? "fa-times-circle"
                                            : "fa-info-circle"
                                    } mr-1`}
                                ></i>
                                {lead.status}
                            </div>
                            <p className="text-sm font-bold text-gray-800">{lead.projectedRevenue}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white bg-opacity-50 rounded-lg p-2 text-center">
                            <i className="fas fa-phone text-blue-500 text-sm mb-1"></i>
                            <p className="text-xs text-gray-600">Phone</p>
                            <p className="text-xs font-bold text-gray-800">{lead.phone}</p>
                        </div>
                        <div className="bg-white bg-opacity-50 rounded-lg p-2 text-center">
                            <i className="fas fa-envelope text-blue-500 text-sm mb-1"></i>
                            <p className="text-xs text-gray-600">Email</p>
                            <p className="text-xs font-bold text-gray-800 truncate">{lead.email}</p>
                        </div>
                        <div className="bg-white bg-opacity-50 rounded-lg p-2 text-center">
                            <i className="fas fa-user-tie text-blue-500 text-sm mb-1"></i>
                            <p className="text-xs text-gray-600">Owner</p>
                            <p className="text-xs font-bold text-gray-800">{lead.owner}</p>
                        </div>
                    </div>
                </div>

                {/* Warning Box */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 rounded-xl p-3 mb-4">
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-exclamation-triangle text-white text-sm"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-gray-800 mb-1">⚠️ Critical Warning</h3>
                            <p className="text-xs text-gray-700 mb-2">Deleting this lead will permanently remove:</p>
                            <ul className="space-y-1 text-xs text-gray-600">
                                <li className="flex items-center">
                                    <i className="fas fa-times text-red-500 mr-2 text-xs"></i>
                                    Contact information and history
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-times text-red-500 mr-2 text-xs"></i>
                                    Activities and engagement records
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-times text-red-500 mr-2 text-xs"></i>
                                    Revenue projections and financial data
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Confirmation Checkbox */}
                <div className="flex items-center my-3 cursor-pointer select-none" onClick={toggleConfirmation}>
                    <div
                        className={`w-5 h-5 border-2 border-red-500 rounded mr-2 relative transition-all duration-300 ${
                            isConfirmed ? "bg-gradient-to-br from-red-500 to-red-600 border-red-600" : ""
                        }`}
                    >
                        {isConfirmed && (
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                                ✓
                            </div>
                        )}
                    </div>
                    <label className="text-sm font-semibold text-gray-800 cursor-pointer">
                        I understand this action is permanent and cannot be undone
                    </label>
                </div>

                {/* Progress Bar */}
                {isDeleting && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">Deleting lead...</span>
                            <span className="text-xs font-medium text-gray-700">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-red-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-6">
                    <button
                        onClick={confirmDelete}
                        disabled={!isConfirmed || isDeleting}
                        className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                            isConfirmed && !isDeleting
                                ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                    >
                        {isDeleting ? (
                            <>
                                <i className="fas fa-spinner fa-spin text-sm"></i>
                                Processing...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-trash-alt text-sm"></i>
                                Delete Lead Permanently
                            </>
                        )}
                    </button>
                    <button
                        onClick={cancelDelete}
                        className="px-4 py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                    >
                        <i className="fas fa-times text-sm"></i>
                        Cancel & Keep Lead
                    </button>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <div
                    className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 text-white font-semibold flex items-center gap-2 text-sm ${
                        notification.type === "success"
                            ? "bg-green-500"
                            : notification.type === "warning"
                            ? "bg-yellow-500"
                            : notification.type === "info"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    }`}
                >
                    <i
                        className={`fas text-xs ${
                            notification.type === "success"
                                ? "fa-check-circle"
                                : notification.type === "warning"
                                ? "fa-exclamation-triangle"
                                : notification.type === "info"
                                ? "fa-info-circle"
                                : "fa-bell"
                        }`}
                    ></i>
                    {notification.message}
                </div>
            )}
        </div>
    )
}
