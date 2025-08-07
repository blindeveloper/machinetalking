# Get the current timestamp in milliseconds to create a unique filename
current_time_ms=$(date +%s%3N)
file_name="lr_lmb_${current_time_ms}.zip"
# Create a zip file containing the installed Python packages
cd ../../../lambdas
zip -r9 ${file_name} lr_lambda.py

# Move the zip file to the bundles folder two levels up
mv ${file_name} ../bundles/
echo "${file_name} generated"