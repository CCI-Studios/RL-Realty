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

  // Exported image style: property_page_image.
  $styles['property_page_image'] = array(
    'name' => 'property_page_image',
    'label' => 'Property Page Image',
    'effects' => array(
      4 => array(
        'label' => 'Crop and scale manually',
        'help' => 'Crop and scale a user-selected area, respecting the ratio of the destination width and height.',
        'effect callback' => 'manualcrop_crop_and_scale_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'manualcrop_crop_and_scale_form',
        'summary theme' => 'manualcrop_crop_and_scale_summary',
        'module' => 'manualcrop',
        'name' => 'manualcrop_crop_and_scale',
        'data' => array(
          'width' => 720,
          'height' => 380,
          'upscale' => 0,
          'respectminimum' => 1,
          'onlyscaleifcrop' => 0,
          'style_name' => 'property_page_image',
        ),
        'weight' => 0,
      ),
    ),
  );

  // Exported image style: property_page_thumbnail.
  $styles['property_page_thumbnail'] = array(
    'name' => 'property_page_thumbnail',
    'label' => 'Property Page Thumbnail',
    'effects' => array(
      3 => array(
        'label' => 'Scale and crop',
        'help' => 'Scale and crop will maintain the aspect-ratio of the original image, then crop the larger dimension. This is most useful for creating perfectly square thumbnails without stretching the image.',
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 119,
          'height' => 91,
        ),
        'weight' => 1,
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
    'special_rental' => array(
      'name' => t('Short-Term Rental'),
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
