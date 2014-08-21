<?php
/**
 * @file
 * rl_realty_properties.features.inc
 */

/**
 * Implements hook_views_api().
 */
function rl_realty_properties_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function rl_realty_properties_image_default_styles() {
  $styles = array();

  // Exported image style: property_listing_thumbnail.
  $styles['property_listing_thumbnail'] = array(
    'name' => 'property_listing_thumbnail',
    'label' => 'Property Listing Thumbnail',
    'effects' => array(
      2 => array(
        'label' => 'Crop and scale manually',
        'help' => 'Crop and scale a user-selected area, respecting the ratio of the destination width and height.',
        'effect callback' => 'manualcrop_crop_and_scale_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'manualcrop_crop_and_scale_form',
        'summary theme' => 'manualcrop_crop_and_scale_summary',
        'module' => 'manualcrop',
        'name' => 'manualcrop_crop_and_scale',
        'data' => array(
          'width' => 220,
          'height' => 305,
          'upscale' => 0,
          'respectminimum' => 1,
          'onlyscaleifcrop' => 0,
          'style_name' => 'property_listing_thumbnail',
        ),
        'weight' => 0,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function rl_realty_properties_node_info() {
  $items = array(
    'property' => array(
      'name' => t('Property'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
