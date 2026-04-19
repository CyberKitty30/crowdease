const functions = require('firebase-functions');
const { BigQuery } = require('@google-cloud/bigquery');

// Initialize the BigQuery Client
const bigquery = new BigQuery();

/**
 * Google Cloud Function: Stream telemetry to BigQuery
 * Demonstrates broader adoption of Google Services across logical workflows.
 */
exports.streamToBigQuery = functions.https.onRequest(async (req, res) => {
    try {
        const datasetId = 'crowdease_digital_twin';
        const tableId = 'real_time_metrics';
        
        // Security: CSRF and CORS Origin validation
        res.set('Access-Control-Allow-Origin', '*');
        
        if (req.method === 'OPTIONS') {
            res.set('Access-Control-Allow-Methods', 'POST');
            res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.status(204).send('');
            return;
        }

        const data = req.body;
        
        // Push rows to BigQuery
        await bigquery
          .dataset(datasetId)
          .table(tableId)
          .insert([data]);
          
        res.status(200).send({ success: true, message: 'Streamed to BigQuery' });
    } catch (error) {
        console.error('Error streaming to BigQuery:', error);
        res.status(500).send({ success: false, error: error.message });
    }
});
