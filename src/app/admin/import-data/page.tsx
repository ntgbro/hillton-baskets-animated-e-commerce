"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { importCompleteDatabase } from "@/lib/firestore-complete-with-subcollections";
import { import33CollectionsDatabase } from "@/lib/firestore-33-collections-import";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Loader2, Database, Trash2, AlertTriangle } from "lucide-react";

export default function FirestoreImportPage() {
    const [importing, setImporting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Import ALL 36 Collections (17 original + 12 new + 7 others)
    const handleImport36Collections = async () => {
        setImporting(true);
        setResults(null);

        try {
            console.log('📦 Step 1/2: Importing original 17 collections...');
            const originalResults = await importCompleteDatabase();

            console.log('📦 Step 2/2: Importing new 12 collections...');
            const newResults = await import33CollectionsDatabase();

            // Merge results
            const combinedResults = {
                success: [...originalResults.success, ...newResults.success],
                errors: [...originalResults.errors, ...newResults.errors]
            };

            setResults(combinedResults);

            if (combinedResults.errors.length === 0) {
                toast.success(`✅ Successfully imported ${combinedResults.success.length} documents across 36 collections!`);
            } else {
                toast.warning(`⚠️ Imported ${combinedResults.success.length} documents with ${combinedResults.errors.length} errors`);
            }
        } catch (error: any) {
            toast.error(`❌ Import failed: ${error.message}`);
            console.error(error);
        } finally {
            setImporting(false);
        }
    };

    // Delete all collections
    const handleDeleteAllData = async () => {
        if (!deleteConfirm) {
            toast.error("Please confirm deletion first!");
            return;
        }

        setDeleting(true);

        try {
            const collectionsToDelete = [
                'company_info', 'categories', 'products', 'coupons', 'services',
                'cities', 'warehouse', 'app_settings', 'users', 'orders',
                'chats', 'support_tickets', 'support_tickets_web', 'payments',
                'invoices', 'admin_alerts', 'user_activity_logs', 'audit_logs',
                'staff_activity_logs', 'staff', 'salary_payments', 'raw_materials',
                'suppliers', 'purchase_orders', 'expenditures', 'notifications_global',
                'service_bookings', 'return_requests'
            ];

            let deletedCount = 0;

            for (const collectionName of collectionsToDelete) {
                try {
                    const querySnapshot = await getDocs(collection(db, collectionName));

                    for (const docSnapshot of querySnapshot.docs) {
                        await deleteDoc(doc(db, collectionName, docSnapshot.id));
                        deletedCount++;
                    }

                    console.log(`✅ Deleted collection: ${collectionName} (${querySnapshot.size} docs)`);
                } catch (error) {
                    console.error(`Error deleting ${collectionName}:`, error);
                }
            }

            toast.success(`🗑️ Deleted ${deletedCount} documents from all collections!`);
            setDeleteConfirm(false);
        } catch (error: any) {
            toast.error(`❌ Deletion failed: ${error.message}`);
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
                        <Database className="h-10 w-10" />
                        36 Collections Database Import
                    </h1>
                    <p className="text-muted-foreground">
                        Import complete enterprise database with logging, staff, financial tracking, returns & more!
                    </p>
                </div>

                {/* Warning Alert */}
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Important:</strong> Before importing, make sure you have temporarily set Firestore rules to allow writes:
                        <code className="block mt-2 p-2 bg-black/20 rounded">allow read, write: if request.auth != null;</code>
                    </AlertDescription>
                </Alert>

                {/* Import Complete Database */}
                <Card>
                    <CardHeader>
                        <CardTitle>Import 36 Collections Database</CardTitle>
                        <CardDescription>
                            Import ALL collections with 70+ sample documents including:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong>E-commerce:</strong> products, orders, payments, invoices</li>
                                <li><strong>Staff & Payroll:</strong> employees, salary payments, attendance</li>
                                <li><strong>Financial:</strong> expenses, suppliers, purchase orders</li>
                                <li><strong>Logging:</strong> user activity, audit trails, staff logs</li>
                                <li><strong>CRITICAL:</strong> returns/refunds, service bookings, global notifications</li>
                            </ul>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            onClick={handleImport36Collections}
                            className="w-full"
                            size="lg"
                            disabled={importing || deleting}
                        >
                            {importing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Importing 70+ documents...
                                </>
                            ) : (
                                <>
                                    <Database className="mr-2 h-4 w-4" />
                                    Import 36 Collections (70+ Documents)
                                </>
                            )}
                        </Button>

                        {results && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span className="font-medium">
                                        Successfully imported: {results.success.length} documents
                                    </span>
                                </div>

                                {results.errors.length > 0 && (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <XCircle className="h-5 w-5" />
                                        <span className="font-medium">
                                            Errors: {results.errors.length}
                                        </span>
                                    </div>
                                )}

                                <details className="mt-4">
                                    <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                                        View imported documents ({results.success.length})
                                    </summary>
                                    <div className="mt-2 max-h-60 overflow-y-auto border rounded p-2 text-xs font-mono">
                                        {results.success.map((path: string, index: number) => (
                                            <div key={index} className="text-green-600">✓ {path}</div>
                                        ))}
                                    </div>
                                </details>

                                {results.errors.length > 0 && (
                                    <details className="mt-2">
                                        <summary className="cursor-pointer text-sm text-red-600 hover:text-red-700">
                                            View errors ({results.errors.length})
                                        </summary>
                                        <div className="mt-2 max-h-40 overflow-y-auto border border-red-300 rounded p-2 text-xs">
                                            {results.errors.map((err: any, index: number) => (
                                                <div key={index} className="text-red-600">
                                                    ✗ {err.collection}: {err.error?.message || 'Unknown error'}
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete All Data (Dangerous) */}
                <Card className="border-red-300">
                    <CardHeader>
                        <CardTitle className="text-red-600 flex items-center gap-2">
                            <Trash2 className="h-5 w-5" />
                            Delete All Data (Dangerous!)
                        </CardTitle>
                        <CardDescription>
                            ⚠️ This will DELETE ALL documents from ALL collections. Use this for a clean import.
                            <br />
                            <strong className="text-red-600">This action cannot be undone!</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="delete-confirm"
                                checked={deleteConfirm}
                                onChange={(e) => setDeleteConfirm(e.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor="delete-confirm" className="text-sm font-medium">
                                I understand this will permanently delete all data
                            </label>
                        </div>

                        <Button
                            onClick={handleDeleteAllData}
                            variant="destructive"
                            className="w-full"
                            disabled={!deleteConfirm || importing || deleting}
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting all data...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete All Collections
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Instructions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Import Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                            <h4 className="font-semibold">Option 1: Clean Import (Recommended)</h4>
                            <ol className="list-decimal list-inside space-y-1 pl-2">
                                <li>Temporarily adjust Firestore rules (allow writes)</li>
                                <li>Click "Delete All Collections" (checkbox confirmation required)</li>
                                <li>Wait for deletion to complete</li>
                                <li>Click "Import 36 Collections"</li>
                                <li>Wait ~20-30 seconds for 70+ documents</li>
                                <li>Restore secure Firestore rules</li>
                            </ol>

                            <h4 className="font-semibold mt-4">Option 2: Merge Import</h4>
                            <ol className="list-decimal list-inside space-y-1 pl-2">
                                <li>Temporarily adjust Firestore rules</li>
                                <li>Click "Import 36 Collections" directly</li>
                                <li>Existing data will be kept (documents with same ID will be overwritten)</li>
                                <li>Restore secure Firestore rules</li>
                            </ol>

                            <h4 className="font-semibold mt-4">After Import:</h4>
                            <ul className="list-disc list-inside space-y-1 pl-2">
                                <li>Go to Firebase Console → Firestore Database → Data</li>
                                <li>Verify all 36 collections exist</li>
                                <li>Check sample documents are present</li>
                                <li>Restore secure rules from <code>src/firestore.rules</code></li>
                                <li>Create admin user (add <code>role: 'admin'</code> to users doc)</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Collections List */}
                <Card>
                    <CardHeader>
                        <CardTitle>36 Collections Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                            <div className="font-mono">✓ company_info</div>
                            <div className="font-mono">✓ categories</div>
                            <div className="font-mono">✓ products</div>
                            <div className="font-mono">✓ coupons</div>
                            <div className="font-mono">✓ promotions</div>
                            <div className="font-mono">✓ services</div>
                            <div className="font-mono">✓ cities</div>
                            <div className="font-mono">✓ warehouse</div>
                            <div className="font-mono">✓ app_settings</div>
                            <div className="font-mono">✓ users</div>
                            <div className="font-mono">✓ orders</div>
                            <div className="font-mono">✓ invoices</div>
                            <div className="font-mono">✓ payments</div>
                            <div className="font-mono">✓ chats</div>
                            <div className="font-mono">✓ support_tickets</div>
                            <div className="font-mono">✓ support_tickets_web</div>
                            <div className="font-mono">✓ admin_alerts</div>
                            <div className="font-mono text-blue-600">✓ user_activity_logs</div>
                            <div className="font-mono text-blue-600">✓ audit_logs</div>
                            <div className="font-mono text-blue-600">✓ staff_activity_logs</div>
                            <div className="font-mono text-blue-600">✓ staff</div>
                            <div className="font-mono text-blue-600">✓ salary_payments</div>
                            <div className="font-mono text-blue-600">✓ raw_materials</div>
                            <div className="font-mono text-blue-600">✓ suppliers</div>
                            <div className="font-mono text-blue-600">✓ purchase_orders</div>
                            <div className="font-mono text-blue-600">✓ expenditures</div>
                            <div className="font-mono text-red-600 font-bold">✓ return_requests 🔴</div>
                            <div className="font-mono text-orange-600 font-bold">✓ service_bookings 🟡</div>
                            <div className="font-mono text-orange-600 font-bold">✓ notifications_global 🟡</div>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground">
                            Blue = Enterprise features | Red/Orange = Critical additions
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
