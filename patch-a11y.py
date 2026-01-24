#!/usr/bin/env python3
"""
patch-a11y.py — Accessibility Patch Script for ENGL 2740 Site

Patches HTML files with:
1. Skip link after <body>
2. id="main-content" on <main> tags
3. aria-hidden="true" on icon spans
4. rel="noopener" on external links (target="_blank")

Usage:
    python3 patch-a11y.py

Run from your site's root folder (where your .html files live).
Creates .bak backups before modifying files.
"""

import os
import re
import shutil
from pathlib import Path

# Files to skip (already fixed or handled separately)
SKIP_FILES = {'index.html'}

# The skip link HTML to insert
SKIP_LINK = '<a href="#main-content" class="skip-link">Skip to main content</a>'


def patch_skip_link(content):
    """Add skip link after <body> tag if not already present."""
    if 'skip-link' in content:
        return content, False
    
    # Match <body> or <body class="..."> etc.
    pattern = r'(<body[^>]*>)'
    replacement = r'\1\n\n' + SKIP_LINK + '\n'
    
    new_content, count = re.subn(pattern, replacement, content, count=1)
    return new_content, count > 0


def patch_main_id(content):
    """Add id="main-content" to <main> tag if not already present."""
    # Check if there's a <main> tag at all
    if '<main' not in content:
        return content, False, 'no-main'
    
    # Check if it already has an id
    if re.search(r'<main[^>]*\sid=', content):
        return content, False, None
    
    # Add id to <main> or <main class="...">
    # Pattern handles <main> or <main class="..."> or <main anything>
    pattern = r'<main(\s|>)'
    replacement = r'<main id="main-content"\1'
    
    new_content, count = re.subn(pattern, replacement, content, count=1)
    return new_content, count > 0, None


def patch_aria_hidden(content):
    """Add aria-hidden="true" to icon spans."""
    # Skip if no icons present
    if 'material-symbols-outlined' not in content:
        return content, False
    
    # Skip spans that already have aria-hidden
    # Match: <span class="material-symbols-outlined"> without aria-hidden
    pattern = r'<span class="material-symbols-outlined"(?![^>]*aria-hidden)'
    replacement = r'<span class="material-symbols-outlined" aria-hidden="true"'
    
    new_content, count = re.subn(pattern, replacement, content)
    return new_content, count > 0


def patch_rel_noopener(content):
    """Add rel="noopener" to links with target="_blank"."""
    # Match target="_blank" not already followed by rel="noopener"
    # This handles cases where rel might be elsewhere in the tag
    
    # First, find all links with target="_blank"
    # Only patch if they don't already have rel="noopener"
    
    def add_noopener(match):
        tag = match.group(0)
        if 'rel="noopener"' in tag or "rel='noopener'" in tag:
            return tag
        # Add rel="noopener" after target="_blank"
        return tag.replace('target="_blank"', 'target="_blank" rel="noopener"')
    
    # Match <a ...target="_blank"...>
    pattern = r'<a\s[^>]*target="_blank"[^>]*>'
    
    new_content = re.sub(pattern, add_noopener, content)
    changed = new_content != content
    return new_content, changed


def patch_file(filepath):
    """Apply all patches to a single file."""
    print(f"\n{'='*60}")
    print(f"Processing: {filepath.name}")
    print('='*60)
    
    # Read file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = []
    warnings = []
    
    # 1. Skip link
    content, changed = patch_skip_link(content)
    if changed:
        changes.append("✓ Added skip link")
    else:
        print("  · Skip link already present or unchanged")
    
    # 2. Main ID
    content, changed, warning = patch_main_id(content)
    if warning == 'no-main':
        warnings.append("⚠ No <main> tag found — skip link target won't work")
    elif changed:
        changes.append("✓ Added id='main-content' to <main>")
    else:
        print("  · Main ID already present or unchanged")
    
    # 3. Aria-hidden on icons
    content, changed = patch_aria_hidden(content)
    if changed:
        changes.append("✓ Added aria-hidden to icon spans")
    else:
        print("  · No icon spans to patch")
    
    # 4. rel="noopener"
    content, changed = patch_rel_noopener(content)
    if changed:
        changes.append("✓ Added rel='noopener' to external links")
    else:
        print("  · No external links to patch")
    
    # Report changes
    if changes:
        print("\nChanges made:")
        for change in changes:
            print(f"  {change}")
    
    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(f"  {warning}")
    
    # Write if changed
    if content != original_content:
        # Create backup
        backup_path = filepath.with_suffix('.html.bak')
        shutil.copy2(filepath, backup_path)
        print(f"\n  Backup created: {backup_path.name}")
        
        # Write patched file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  File updated: {filepath.name}")
        return True
    else:
        print("\n  No changes needed")
        return False


def main():
    print("="*60)
    print("ENGL 2740 Accessibility Patch Script")
    print("="*60)
    
    # Find all HTML files in current directory
    html_files = list(Path('.').glob('*.html'))
    
    if not html_files:
        print("\nNo .html files found in current directory.")
        print("Make sure you're running this from your site's root folder.")
        return
    
    print(f"\nFound {len(html_files)} HTML file(s)")
    print(f"Skipping: {', '.join(SKIP_FILES)}")
    
    files_to_process = [f for f in html_files if f.name not in SKIP_FILES]
    
    if not files_to_process:
        print("\nNo files to process after exclusions.")
        return
    
    print(f"Processing: {len(files_to_process)} file(s)")
    
    modified_count = 0
    warning_files = []
    
    for filepath in sorted(files_to_process):
        try:
            if patch_file(filepath):
                modified_count += 1
        except Exception as e:
            print(f"\n  ERROR processing {filepath.name}: {e}")
    
    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Files processed: {len(files_to_process)}")
    print(f"Files modified:  {modified_count}")
    print(f"Backups created: {modified_count} (.html.bak files)")
    
    print("\nNext steps:")
    print("  1. Review the changes in your browser")
    print("  2. Test with keyboard navigation (Tab key)")
    print("  3. Delete .bak files once you're satisfied")
    print("  4. Manually fix any files flagged with warnings")


if __name__ == '__main__':
    main()
