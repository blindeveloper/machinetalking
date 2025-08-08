#!/bin/bash
# Get the current timestamp in milliseconds to create a unique filename
current_time_ms=$(date +%s%3N)
file_name="house_price_pred_internal_packages_layer_${current_time_ms}.zip"

mkdir -p layer/python
cp -r ../../models/house_price_prediction/build_model layer/python/

cd layer
zip -r9 ${file_name} ./python/

pwd
mkdir -p ../../../bundles/house_price_prediction
mv ${file_name} ../../../bundles/house_price_prediction/

cd ..
rm -rf layer

echo "${file_name} generated"